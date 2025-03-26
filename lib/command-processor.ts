// This file would normally interact with the system to execute commands
// For this demo, we'll simulate command execution

export function validateCommand(command: string): string | null {
  // Basic validation to prevent dangerous commands
  if (command.includes("rm -rf /")) {
    return "Dangerous command detected: Removing root directory is not allowed"
  }

  // Check for empty command
  if (!command.trim()) {
    return "Command cannot be empty"
  }

  // Parse the command to check for basic syntax
  const parts = command.split(" ")
  const cmd = parts[0]

  // Check if options that require arguments have them
  for (let i = 1; i < parts.length; i++) {
    if (parts[i].startsWith("-") && i + 1 < parts.length) {
      const option = parts[i].substring(1)
      const optionData = commandData[cmd]?.options.find((opt) => opt.flag === option)

      if (optionData?.requiresArg && (i + 1 >= parts.length || parts[i + 1].startsWith("-"))) {
        return `Option -${option} requires an argument`
      }
    }
  }

  // Special validation for specific commands
  if (cmd === "ssh") {
    // Check if there's a host specified
    let hasHost = false
    for (let i = 1; i < parts.length; i++) {
      if (!parts[i].startsWith("-") && (parts[i].includes("@") || parts[i].includes("."))) {
        hasHost = true
        break
      }
    }
    if (!hasHost) {
      return "SSH command requires a host to connect to"
    }
  }

  return null // No errors
}

export async function executeCommand(command: string): Promise<string> {
  // In a real application, this would use Node.js child_process or a server API
  // For this demo, we'll simulate responses

  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate different command outputs
      if (command.startsWith("ls")) {
        if (command.includes("-l")) {
          resolve(`total 32
drwxr-xr-x  2 user group  4096 Mar 26 12:34 directory1/
drwxr-xr-x  3 user group  4096 Mar 25 10:15 directory2/
-rw-r--r--  1 user group   256 Mar 26 11:22 file1.txt
-rw-r--r--  1 user group  1024 Mar 24 09:18 file2.txt
-rw-------  1 user group    89 Mar 23 15:42 .hidden_file`)
        } else {
          resolve(`directory1/\ndirectory2/\nfile1.txt\nfile2.txt\n.hidden_file`)
        }
      } else if (command.startsWith("cp")) {
        resolve(`Copied files successfully`)
      } else if (command.startsWith("mv")) {
        resolve(`Moved files successfully`)
      } else if (command.startsWith("grep")) {
        if (command.includes("-e")) {
          const pattern = command.split("-e")[1].trim().split(" ")[0]
          resolve(
            `Searching for pattern: ${pattern}\nfile1.txt:10: match found for "${pattern}"\nfile2.txt:24: another match for "${pattern}"`,
          )
        } else {
          resolve(`file1.txt:10: match found\nfile2.txt:24: another match`)
        }
      } else if (command.startsWith("find")) {
        if (command.includes("-name")) {
          const pattern = command.split("-name")[1].trim().split(" ")[0]
          resolve(`Finding files matching: ${pattern}\n./file1.txt\n./directory1/file3.txt`)
        } else {
          resolve(`./file1.txt\n./directory1/file3.txt`)
        }
      } else if (command.startsWith("curl")) {
        if (command.includes("-o")) {
          const filename = command.split("-o")[1].trim().split(" ")[0]
          resolve(
            `% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n                                 Dload  Upload   Total   Spent    Left  Speed\n100  1256  100  1256    0     0   6280      0 --:--:-- --:--:-- --:--:--  6280\nDownloaded to ${filename}`,
          )
        } else {
          resolve(
            `<!DOCTYPE html>\n<html>\n<head>\n  <title>Example Domain</title>\n</head>\n<body>\n  <h1>Example Domain</h1>\n  <p>This domain is for use in illustrative examples in documents.</p>\n</body>\n</html>`,
          )
        }
      } else if (command.startsWith("ps")) {
        resolve(
          `  PID TTY          TIME CMD\n 1234 pts/0    00:00:01 bash\n 5678 pts/0    00:00:00 ps\n 9012 ?        00:01:23 systemd\n 3456 ?        00:00:12 sshd`,
        )
      } else if (command.startsWith("df")) {
        if (command.includes("-h")) {
          resolve(
            `Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G   10G   10G  50% /\n/dev/sda2       100G   30G   70G  30% /home`,
          )
        } else {
          resolve(`Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/sda1      20971520 10485760  10485760  50% /
/dev/sda2     104857600 31457280  73400320  30% /home`)
        }
      } else if (command.startsWith("du")) {
        if (command.includes("-h")) {
          resolve(`4.0K    ./file1.txt\n8.0K    ./file2.txt\n12K     ./directory1\n24K     .`)
        } else {
          resolve(`4       ./file1.txt\n8       ./file2.txt\n12      ./directory1\n24      .`)
        }
      } else if (command.startsWith("rsync")) {
        resolve(`sending incremental file list
file1.txt
file2.txt
directory1/file3.txt

sent 1,234 bytes  received 42 bytes  2,552.00 bytes/sec
total size is 10,240  speedup is 8.04`)
      } else if (command.startsWith("sed")) {
        resolve(`Processed input with sed command`)
      } else if (command.startsWith("awk")) {
        resolve(`Processed input with awk command`)
      } else if (command.startsWith("ssh")) {
        // Extract the host from the command
        let host = ""
        const parts = command.split(" ")
        for (let i = 1; i < parts.length; i++) {
          if (parts[i].includes("@")) {
            host = parts[i]
            break
          }
        }

        resolve(`Connecting to ${host || "remote host"}...
Last login: Wed Mar 26 06:45:42 2025 from 192.168.1.10
Welcome to Linux Server

user@server:~$ `)
      } else {
        resolve(`Command executed: ${command}\nThis is a simulated response.`)
      }
    }, 500) // Simulate a delay
  })
}

// Import command data for validation
import { commandData } from "./command-data"

export function getCommandHistory(): string[] {
  // In a real app, this would retrieve from localStorage or a database
  const savedHistory = localStorage.getItem("commandHistory")
  return savedHistory ? JSON.parse(savedHistory) : []
}

export function saveCommandHistory(history: string[]): void {
  // In a real app, this would save to localStorage or a database
  localStorage.setItem("commandHistory", JSON.stringify(history))
}

