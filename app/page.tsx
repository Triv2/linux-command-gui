"use client"

import { useState, useEffect } from "react"
import { Terminal, Play, AlertCircle, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { commandData } from "@/lib/command-data"
import {  validateCommand } from "@/lib/command-processor"

interface OptionArgument {
  flag: string
  value: string
}

export default function Home() {
  const [selectedCommand, setSelectedCommand] = useState("")
  const [arguments_, setArguments] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [optionArguments, setOptionArguments] = useState<OptionArgument[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  // const [commandOutput, setCommandOutput] = useState("")
  const [error, setError] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [livePreview, setLivePreview] = useState("")

  // Update live preview whenever inputs change
  useEffect(() => {
    if (selectedCommand) {
      const command = constructCommand()
      setLivePreview(command)
    } else {
      setLivePreview("")
    }
  }, [selectedCommand, arguments_, selectedOptions, optionArguments])

  const handleCommandChange = (value: string) => {
    setSelectedCommand(value)
    setSelectedOptions([])
    setOptionArguments([])
    setArguments("")
    setError("")
  }

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      // Remove option
      setSelectedOptions((prev) => prev.filter((opt) => opt !== option))
      // Remove any associated arguments
      setOptionArguments((prev) => prev.filter((arg) => arg.flag !== option))
    } else {
      // Add option
      setSelectedOptions((prev) => [...prev, option])

      // If option requires an argument, initialize it with empty value
      const optionData = commandData[selectedCommand]?.options.find((opt) => opt.flag === option)
      if (optionData?.requiresArg) {
        setOptionArguments((prev) => [...prev, { flag: option, value: "" }])
      }
    }
  }

  const updateOptionArgument = (flag: string, value: string) => {
    setOptionArguments((prev) => prev.map((arg) => (arg.flag === flag ? { ...arg, value } : arg)))
  }

  const constructCommand = () => {
    if (!selectedCommand) return ""

    // Start with the base command
    let command = selectedCommand

    // Add options with their arguments if needed
    selectedOptions.forEach((option) => {
      const optionData = commandData[selectedCommand]?.options.find((opt) => opt.flag === option)

      if (optionData?.requiresArg) {
        // Find the argument value
        const argValue = optionArguments.find((arg) => arg.flag === option)?.value || ""
        // Only add if there's a value
        if (argValue) {
          command += ` -${option} ${argValue}`
        } else {
          command += ` -${option}` // Add without argument if missing
        }
      } else {
        command += ` -${option}`
      }
    })

    // Format arguments if needed
    let formattedArgs = arguments_
    if (commandData[selectedCommand]?.formatArgs && arguments_.trim()) {
      formattedArgs = commandData[selectedCommand].formatArgs(arguments_)
    }

    // Add main arguments if any
    if (formattedArgs.trim()) {
      command += ` ${formattedArgs}`
    }

    return command.trim()
  }

  // const previewCommand = () => {
  //   const command = constructCommand()
  //   if (!command) {
  //     setError("Please select a command first")
  //     return
  //   }

  //   const validationError = validateCommand(command)
  //   if (validationError) {
  //     setError(validationError)
  //     return
  //   }

  //   setCommandOutput(`Preview: ${command}`)
  //   setError("")
  // }

  const runCommand = async () => {
    const command = constructCommand()
    if (!command) {
      setError("Please select a command first")
      return
    }

    const validationError = validateCommand(command)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsExecuting(true)
    setError("")

    try {
      // const output = await executeCommand(command)
      // // setCommandOutput(output)
      setCommandHistory((prev) => [command, ...prev].slice(0, 10))
    } catch (err) {
      setError(`Execution error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsExecuting(false)
    }
  }

  const loadFromHistory = (command: string) => {
    // Parse the command to set the UI state
    const parts = command.split(" ")
    const cmd = parts[0]

    // Reset current state
    setSelectedCommand(cmd)
    setSelectedOptions([])
    setOptionArguments([])
    setArguments("")

    // Process options and arguments
    let i = 1
    while (i < parts.length) {
      if (parts[i].startsWith("-")) {
        // It's an option
        const option = parts[i].substring(1)

        // Check if this option requires an argument
        const optionData = commandData[cmd]?.options.find((opt) => opt.flag === option)

        if (optionData?.requiresArg && i + 1 < parts.length && !parts[i + 1].startsWith("-")) {
          // This option has an argument
          setSelectedOptions((prev) => [...prev, option])
          setOptionArguments((prev) => [...prev, { flag: option, value: parts[i + 1] }])
          i += 2 // Skip the option and its argument
        } else {
          // Option without argument
          setSelectedOptions((prev) => [...prev, option])
          i++
        }
      } else {
        // First non-option is the start of arguments
        break
      }
    }

    // Join the remaining parts as arguments
    if (i < parts.length) {
      setArguments(parts.slice(i).join(" "))
    }
  }

  return (
    <main className="container mx-auto p-4 max-w-6xl">
      <Card className="mb-6">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="flex items-center gap-2 pt-1">
            <Terminal className="h-6 w-6" />
            Linux Command Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Command Selection Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Command</h3>
              <Select value={selectedCommand} onValueChange={handleCommandChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a command" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Object.keys(commandData)
                    .sort()
                    .map((cmd) => (
                      <SelectItem key={cmd} value={cmd}>
                        {cmd}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {selectedCommand && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    {commandData[selectedCommand]?.description || "No description available"}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <Label className="p-1" htmlFor="arguments">Arguments</Label>
                <Input
                  id="arguments"
                  placeholder="e.g., file1.txt file2.txt"
                  value={arguments_}
                  onChange={(e) => setArguments(e.target.value)}
                />
              </div>

              {/* Live Preview */}
              <div className="mt-4 p-3 bg-muted rounded-md">
                <Label className="text-sm font-medium">Live Preview:</Label>
                <pre className="mt-1 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                  {livePreview || "Command will appear here as you build it"}
                </pre>
              </div>

              {/* Examples Section */}
              {selectedCommand && (
                <div className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="examples">
                      <AccordionTrigger className="text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Usage Examples
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 mt-2">
                          {commandData[selectedCommand]?.examples.map((example, index) => (
                            <div key={index} className="p-3 bg-muted rounded-md">
                              <h4 className="text-sm font-medium">{example.title}</h4>
                              <pre className="mt-1 text-xs font-mono bg-background p-2 rounded overflow-x-auto">
                                {example.command}
                              </pre>
                              <p className="mt-1 text-xs text-muted-foreground">{example.description}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>

            {/* Options Panel */}
            <div>
              <h3 className="text-lg font-medium mb-4">Options</h3>
              {selectedCommand ? (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {commandData[selectedCommand]?.options.map((option) => (
                      <div key={option.flag} className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id={`option-${option.flag}`}
                            checked={selectedOptions.includes(option.flag)}
                            onCheckedChange={() => toggleOption(option.flag)}
                          />
                          <div className="grid gap-1.5">
                            <Label htmlFor={`option-${option.flag}`} className="font-medium">
                              -{option.flag}
                            </Label>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>

                        {/* Show argument input if option is selected and requires an argument */}
                        {selectedOptions.includes(option.flag) && option.requiresArg && (
                          <div className="ml-6 mt-2">
                            <Label htmlFor={`arg-${option.flag}`} className="text-sm">
                              {option.argDescription || "Argument"}:
                            </Label>
                            <Input
                              id={`arg-${option.flag}`}
                              value={optionArguments.find((arg) => arg.flag === option.flag)?.value || ""}
                              onChange={(e) => updateOptionArgument(option.flag, e.target.value)}
                              placeholder={option.argDescription || "Enter value"}
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground">Select a command to see available options</p>
              )}
            </div>

            {/* Preview and Execute Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Command Actions</h3>
              <div className="flex gap-2">
                {/* <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" onClick={previewCommand} className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Preview the command without executing it</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={runCommand} disabled={isExecuting} className="flex-1">
                        <Play className="mr-2 h-4 w-4" />
                        Execute
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Execute the command </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div defaultValue="output">
                <div className="grid w-full grid-cols-2">
                  {/* <TabsTrigger value="output">Output</TabsTrigger> */}
                  <p >History</p>
                </div>
                <div >
                  <Card>
                    <CardContent className="p-4">
                      <ScrollArea className="h-[200px] w-full rounded-md border">
                        {commandHistory.length > 0 ? (
                          <ul className="p-4">
                            {commandHistory.map((cmd, index) => (
                              <li
                                key={index}
                                className="py-2 px-3 hover:bg-accent rounded-md cursor-pointer font-mono text-sm"
                                onClick={() => loadFromHistory(cmd)}
                              >
                                {cmd}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="p-4 text-muted-foreground">No command history yet</p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

