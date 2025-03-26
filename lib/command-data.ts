// Command database with descriptions, options, and examples
export const commandData: Record<
  string,
  {
    description: string
    options: Array<{
      flag: string
      description: string
      requiresArg?: boolean
      argDescription?: string
    }>
    examples: Array<{
      title: string
      command: string
      description: string
    }>
    formatArgs?: (args: string) => string
  }
> = {
  ls: {
    description: "List directory contents",
    options: [
      { flag: "l", description: "Use a long listing format" },
      { flag: "a", description: "Do not ignore entries starting with ." },
      { flag: "h", description: "Human-readable file sizes" },
      { flag: "t", description: "Sort by modification time, newest first" },
      { flag: "r", description: "Reverse order while sorting" },
      { flag: "S", description: "Sort by file size, largest first" },
      { flag: "R", description: "List subdirectories recursively" },
      { flag: "1", description: "List one file per line" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "ls",
        description: "List files and directories in the current directory",
      },
      {
        title: "Detailed Listing",
        command: "ls -la",
        description: "Show detailed information including hidden files",
      },
      {
        title: "Advanced Sorting",
        command: "ls -lhS /var/log",
        description: "List files in /var/log with human-readable sizes, sorted by size",
      },
    ],
  },
  cp: {
    description: "Copy files and directories",
    options: [
      { flag: "r", description: "Copy directories recursively" },
      { flag: "i", description: "Prompt before overwrite" },
      { flag: "u", description: "Copy only when the source file is newer" },
      { flag: "v", description: "Explain what is being done" },
      { flag: "f", description: "Force copy by removing the destination file if needed" },
      { flag: "n", description: "Do not overwrite an existing file" },
      { flag: "p", description: "Preserve file attributes if possible" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "cp file.txt backup.txt",
        description: "Copy a single file to a new location",
      },
      {
        title: "Copy Directory",
        command: "cp -r documents/ backup/",
        description: "Copy a directory and all its contents recursively",
      },
      {
        title: "Advanced Copy",
        command: "cp -ruvp /home/user/projects/ /media/backup/",
        description: "Copy recursively, only newer files, with verbose output, preserving attributes",
      },
    ],
  },
  mv: {
    description: "Move (rename) files",
    options: [
      { flag: "i", description: "Prompt before overwrite" },
      { flag: "f", description: "Do not prompt before overwriting" },
      { flag: "n", description: "Do not overwrite an existing file" },
      { flag: "v", description: "Explain what is being done" },
      { flag: "u", description: "Move only when the source file is newer" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "mv file.txt newname.txt",
        description: "Rename a file",
      },
      {
        title: "Move File",
        command: "mv file.txt ~/Documents/",
        description: "Move a file to a different directory",
      },
      {
        title: "Advanced Move",
        command: "mv -vn *.jpg ~/Pictures/vacation/",
        description: "Move all JPG files to a directory, with verbose output, without overwriting",
      },
    ],
  },
  rm: {
    description: "Remove files or directories",
    options: [
      { flag: "r", description: "Remove directories and their contents recursively" },
      { flag: "f", description: "Ignore nonexistent files, never prompt" },
      { flag: "i", description: "Prompt before every removal" },
      { flag: "d", description: "Remove empty directories" },
      { flag: "v", description: "Explain what is being done" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "rm file.txt",
        description: "Remove a single file",
      },
      {
        title: "Remove Directory",
        command: "rm -r directory/",
        description: "Remove a directory and all its contents",
      },
      {
        title: "Advanced Removal",
        command: "rm -rfv old_logs/",
        description: "Force remove a directory and all contents with verbose output",
      },
    ],
  },
  grep: {
    description: "Search for patterns in files",
    options: [
      { flag: "i", description: "Ignore case distinctions" },
      { flag: "v", description: "Select non-matching lines" },
      { flag: "r", description: "Read all files under each directory, recursively" },
      { flag: "n", description: "Print line number with output lines" },
      { flag: "c", description: "Print only a count of matching lines per file" },
      { flag: "l", description: "Print only names of files with matching lines" },
      { flag: "w", description: "Match only whole words" },
      {
        flag: "e",
        description: "Use PATTERN as the pattern",
        requiresArg: true,
        argDescription: "Pattern to search for",
      },
      {
        flag: "A",
        description: "Print NUM lines of trailing context after matching lines",
        requiresArg: true,
        argDescription: "Number of lines",
      },
      {
        flag: "B",
        description: "Print NUM lines of leading context before matching lines",
        requiresArg: true,
        argDescription: "Number of lines",
      },
      {
        flag: "C",
        description: "Print NUM lines of output context",
        requiresArg: true,
        argDescription: "Number of lines",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "grep error logfile.txt",
        description: "Search for the word 'error' in a file",
      },
      {
        title: "Recursive Search",
        command: "grep -r -i password /etc/",
        description: "Search recursively for 'password' (case insensitive) in /etc directory",
      },
      {
        title: "Advanced Pattern Matching",
        command: 'grep -n -A 2 -B 1 -e "^[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+" access.log',
        description: "Find IP addresses with line numbers and context lines",
      },
    ],
  },
  find: {
    description: "Search for files in a directory hierarchy",
    options: [
      {
        flag: "name",
        description: "File name matches pattern",
        requiresArg: true,
        argDescription: "Pattern (e.g., '*.txt')",
      },
      { flag: "type", description: "File is of type", requiresArg: true, argDescription: "Type (f:file, d:directory)" },
      {
        flag: "size",
        description: "File uses n units of space",
        requiresArg: true,
        argDescription: "Size (e.g., '+10M')",
      },
      {
        flag: "mtime",
        description: "File's data was last modified n*24 hours ago",
        requiresArg: true,
        argDescription: "Days (e.g., '-7')",
      },
      { flag: "user", description: "File is owned by user", requiresArg: true, argDescription: "Username" },
      {
        flag: "exec",
        description: "Execute command on each file",
        requiresArg: true,
        argDescription: "Command (end with \\;)",
      },
      {
        flag: "maxdepth",
        description: "Descend at most levels of directories",
        requiresArg: true,
        argDescription: "Depth level",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: 'find . -name "*.txt"',
        description: "Find all .txt files in current directory and subdirectories",
      },
      {
        title: "Find by Type and Time",
        command: "find /home -type f -mtime -7",
        description: "Find files modified in the last 7 days in /home",
      },
      {
        title: "Advanced Find with Exec",
        command: 'find /var/log -name "*.log" -size +10M -exec ls -lh {} \\;',
        description: "Find log files larger than 10MB and show their details",
      },
    ],
  },
  chmod: {
    description: "Change file mode bits",
    options: [
      { flag: "R", description: "Change files and directories recursively" },
      { flag: "v", description: "Output a diagnostic for every file processed" },
      { flag: "c", description: "Like verbose but report only when a change is made" },
      { flag: "f", description: "Suppress most error messages" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "chmod 755 script.sh",
        description: "Make a script executable by owner and readable by others",
      },
      {
        title: "Recursive Change",
        command: "chmod -R 644 documents/",
        description: "Set permissions recursively on all files in a directory",
      },
      {
        title: "Advanced Permissions",
        command: "chmod -v u+rwx,g+rx,o-rwx important_file",
        description: "Set specific permissions with verbose output",
      },
    ],
  },
  mkdir: {
    description: "Make directories",
    options: [
      { flag: "p", description: "Create parent directories as needed" },
      { flag: "v", description: "Print a message for each created directory" },
      {
        flag: "m",
        description: "Set file mode (as in chmod)",
        requiresArg: true,
        argDescription: "Mode (e.g., '755')",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "mkdir new_directory",
        description: "Create a single directory",
      },
      {
        title: "Create Parent Directories",
        command: "mkdir -p projects/website/css",
        description: "Create nested directories, creating parents as needed",
      },
      {
        title: "Advanced Creation",
        command: "mkdir -pvm 755 /var/www/html/mysite/images",
        description: "Create directory tree with specific permissions and verbose output",
      },
    ],
  },
  tar: {
    description: "Archive files",
    options: [
      { flag: "c", description: "Create a new archive" },
      { flag: "x", description: "Extract files from an archive" },
      { flag: "t", description: "List the contents of an archive" },
      { flag: "f", description: "Use archive file", requiresArg: true, argDescription: "Archive filename" },
      { flag: "v", description: "Verbosely list files processed" },
      { flag: "z", description: "Filter the archive through gzip" },
      { flag: "j", description: "Filter the archive through bzip2" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "tar -cf archive.tar file1 file2",
        description: "Create a tar archive with specified files",
      },
      {
        title: "Compressed Archive",
        command: "tar -czf backup.tar.gz /home/user/documents",
        description: "Create a compressed tar archive of a directory",
      },
      {
        title: "Advanced Extraction",
        command: "tar -xzvf archive.tar.gz -C /tmp/ --exclude='*.log'",
        description: "Extract a compressed archive to a specific directory, excluding log files",
      },
    ],
  },
  ssh: {
    description: "OpenSSH SSH client (remote login program)",
    options: [
      {
        flag: "p",
        description: "Port to connect to on the remote host",
        requiresArg: true,
        argDescription: "Port number",
      },
      { flag: "i", description: "Identity file (private key)", requiresArg: true, argDescription: "Path to key file" },
      { flag: "v", description: "Verbose mode" },
      { flag: "l", description: "Login name", requiresArg: true, argDescription: "Username" },
      { flag: "X", description: "Enable X11 forwarding" },
      { flag: "C", description: "Use compression" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "ssh user@192.168.1.100",
        description: "Connect to a remote server with username and IP address",
      },
      {
        title: "Custom Port",
        command: "ssh -p 2222 user@example.com",
        description: "Connect to a remote server on a non-standard port",
      },
      {
        title: "Advanced Connection",
        command: "ssh -i ~/.ssh/id_rsa -XCv user@server.example.com",
        description: "Connect with a specific key file, X11 forwarding, compression, and verbose mode",
      },
    ],
    formatArgs: (args: string) => {
      // Format SSH arguments to ensure proper username@host syntax
      const parts = args.trim().split(/\s+/)
      if (parts.length >= 1) {
        // Check if the first part already has @ symbol
        if (!parts[0].includes("@") && parts.length >= 2) {
          // Assume first part is username, second is host
          const username = parts[0]
          const host = parts[1]
          // Replace with formatted username@host
          return `${username}@${host} ${parts.slice(2).join(" ")}`
        }
      }
      return args
    },
  },
  curl: {
    description: "Transfer data from or to a server",
    options: [
      { flag: "o", description: "Write output to file", requiresArg: true, argDescription: "Output filename" },
      { flag: "O", description: "Write output to a file named as the remote file" },
      { flag: "s", description: "Silent mode" },
      { flag: "v", description: "Verbose mode" },
      { flag: "L", description: "Follow redirects" },
      { flag: "H", description: "Pass custom header to server", requiresArg: true, argDescription: "Header string" },
      {
        flag: "X",
        description: "Specify request method",
        requiresArg: true,
        argDescription: "Method (GET, POST, etc.)",
      },
      { flag: "d", description: "Send data in POST request", requiresArg: true, argDescription: "Data string" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "curl https://example.com",
        description: "Fetch the content of a URL",
      },
      {
        title: "Save Output",
        command: "curl -o output.html -L https://example.com",
        description: "Save the output to a file and follow redirects",
      },
      {
        title: "Advanced Request",
        command:
          'curl -X POST -H "Content-Type: application/json" -d \'{"key":"value"}\' https://api.example.com/endpoint',
        description: "Send a POST request with JSON data and custom headers",
      },
    ],
  },
  wget: {
    description: "Non-interactive network downloader",
    options: [
      { flag: "O", description: "Write documents to FILE", requiresArg: true, argDescription: "Output filename" },
      { flag: "q", description: "Quiet (no output)" },
      { flag: "c", description: "Resume getting a partially-downloaded file" },
      { flag: "r", description: "Specify recursive download" },
      { flag: "l", description: "Maximum recursion depth", requiresArg: true, argDescription: "Depth level" },
      { flag: "P", description: "Save files to PREFIX", requiresArg: true, argDescription: "Directory prefix" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "wget https://example.com/file.zip",
        description: "Download a file from a URL",
      },
      {
        title: "Resume Download",
        command: "wget -c https://example.com/largefile.iso",
        description: "Resume a previously interrupted download",
      },
      {
        title: "Advanced Website Mirroring",
        command: "wget -r -l 2 -P ./website-copy -np -k https://example.com/",
        description: "Recursively download a website to a depth of 2 levels, converting links for offline viewing",
      },
    ],
  },
  ps: {
    description: "Report a snapshot of the current processes",
    options: [
      { flag: "e", description: "Select all processes" },
      { flag: "f", description: "Full-format listing" },
      { flag: "a", description: "Select all processes except session leaders" },
      { flag: "u", description: "Select by effective user ID", requiresArg: true, argDescription: "Username" },
      { flag: "x", description: "Select processes without controlling ttys" },
      { flag: "o", description: "User-defined format", requiresArg: true, argDescription: "Format specifier" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "ps",
        description: "Show processes for the current terminal",
      },
      {
        title: "All Processes",
        command: "ps -ef",
        description: "Show all processes with full details",
      },
      {
        title: "Advanced Filtering",
        command: "ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head",
        description: "Show processes with custom columns, sorted by CPU usage",
      },
    ],
  },
  kill: {
    description: "Send a signal to a process",
    options: [
      {
        flag: "s",
        description: "Specify the signal to send",
        requiresArg: true,
        argDescription: "Signal name or number",
      },
      { flag: "l", description: "List all signal names" },
      { flag: "p", description: "Print the process ID, but do not send a signal" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "kill 1234",
        description: "Terminate a process with PID 1234",
      },
      {
        title: "Send Signal",
        command: "kill -s SIGTERM 1234",
        description: "Send a specific signal to a process",
      },
      {
        title: "Advanced Kill",
        command: "kill -9 $(ps -ef | grep 'firefox' | grep -v grep | awk '{print $2}')",
        description: "Force kill all Firefox processes using process substitution",
      },
    ],
  },
  df: {
    description: "Report file system disk space usage",
    options: [
      { flag: "h", description: "Print sizes in human readable format" },
      { flag: "T", description: "Print file system type" },
      { flag: "i", description: "List inode information instead of block usage" },
      { flag: "a", description: "Include dummy file systems" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "df",
        description: "Show disk space usage for all mounted filesystems",
      },
      {
        title: "Human Readable",
        command: "df -h /home",
        description: "Show disk space usage for /home in human-readable format",
      },
      {
        title: "Advanced Information",
        command: "df -hTi /dev/sda1",
        description: "Show human-readable disk space, filesystem type, and inode information for a specific device",
      },
    ],
  },
  du: {
    description: "Estimate file space usage",
    options: [
      { flag: "h", description: "Print sizes in human readable format" },
      { flag: "s", description: "Display only a total for each argument" },
      { flag: "a", description: "Write counts for all files, not just directories" },
      { flag: "c", description: "Produce a grand total" },
      { flag: "d", description: "Maximum depth", requiresArg: true, argDescription: "Depth level" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "du /home/user",
        description: "Show disk usage for a directory",
      },
      {
        title: "Summarized Usage",
        command: "du -sh /var/log/*",
        description: "Show summarized human-readable disk usage for all items in /var/log",
      },
      {
        title: "Advanced Analysis",
        command: "du -ahd 2 /home | sort -hr | head -n 20",
        description: "Find the 20 largest items within 2 levels of /home, sorted by size",
      },
    ],
  },
  rsync: {
    description: "A fast, versatile, remote (and local) file-copying tool",
    options: [
      { flag: "a", description: "Archive mode (recursive, preserves permissions, etc.)" },
      { flag: "v", description: "Verbose mode" },
      { flag: "z", description: "Compress file data during transfer" },
      { flag: "P", description: "Show progress and keep partially transferred files" },
      { flag: "e", description: "Specify the remote shell to use", requiresArg: true, argDescription: "Shell command" },
      { flag: "exclude", description: "Exclude files matching PATTERN", requiresArg: true, argDescription: "Pattern" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "rsync file.txt backup/",
        description: "Copy a file to another directory",
      },
      {
        title: "Remote Copy",
        command: "rsync -avz documents/ user@remote:/backup/",
        description: "Copy a directory to a remote server with compression",
      },
      {
        title: "Advanced Synchronization",
        command: "rsync -avzP --delete --exclude='*.tmp' /home/user/ user@remote:/backup/home/ -e 'ssh -p 2222'",
        description: "Synchronize directories with custom SSH port, progress display, and exclusions",
      },
    ],
    formatArgs: (args: string) => {
      // Format rsync arguments to ensure proper username@host syntax for remote paths
      const parts = args.trim().split(/\s+/)
      for (let i = 0; i < parts.length; i++) {
        // Look for remote paths that have a colon but no @ symbol
        if (parts[i].includes(":") && !parts[i].includes("@") && i > 0) {
          const colonIndex = parts[i].indexOf(":")
          const host = parts[i].substring(0, colonIndex)
          const path = parts[i].substring(colonIndex)

          // Check if previous part might be a username
          if (i > 0 && !parts[i - 1].startsWith("-")) {
            const username = parts[i - 1]
            // Replace with formatted username@host:path
            parts.splice(i - 1, 2, `${username}@${host}${path}`)
            i-- // Adjust index since we removed an element
          }
        }
      }
      return parts.join(" ")
    },
  },
  sed: {
    description: "Stream editor for filtering and transforming text",
    options: [
      { flag: "i", description: "Edit files in place" },
      {
        flag: "e",
        description: "Add the script to the commands to be executed",
        requiresArg: true,
        argDescription: "Script",
      },
      { flag: "n", description: "Suppress automatic printing of pattern space" },
      { flag: "r", description: "Use extended regular expressions" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "sed 's/old/new/' file.txt",
        description: "Replace the first occurrence of 'old' with 'new' in each line",
      },
      {
        title: "In-place Edit",
        command: "sed -i 's/old/new/g' file.txt",
        description: "Replace all occurrences of 'old' with 'new' and edit the file in place",
      },
      {
        title: "Advanced Text Processing",
        command: "sed -n -e '/start/,/end/p' -e '/important/p' file.txt",
        description: "Print lines between 'start' and 'end' patterns and lines containing 'important'",
      },
    ],
  },
  awk: {
    description: "Pattern scanning and processing language",
    options: [
      { flag: "F", description: "Field separator", requiresArg: true, argDescription: "Separator character" },
      { flag: "v", description: "Assign a value to a variable", requiresArg: true, argDescription: "var=value" },
      { flag: "f", description: "Read program from file", requiresArg: true, argDescription: "Program file" },
    ],
    examples: [
      {
        title: "Basic Usage",
        command: "awk '{print $1}' file.txt",
        description: "Print the first column of each line",
      },
      {
        title: "Field Processing",
        command: "awk -F: '{print $1 \" has home directory \" $6}' /etc/passwd",
        description: "Print username and home directory from /etc/passwd",
      },
      {
        title: "Advanced Data Processing",
        command: 'awk -F, \'BEGIN {sum=0; print "Data Analysis:"} {sum+=$3} END {print "Total:", sum}\' data.csv',
        description: "Calculate the sum of the third column in a CSV file with header and footer",
      },
    ],
  },
}

