class DOS {
  constructor(outputElement) {
    this.fs = {
      'A:\\': {
        type: 'dir',
        children: {}
      }
    };
    this.cwd = 'A:\\';
    this.output = outputElement;
  }

  run(commandLine) {
    const [cmd, ...args] = commandLine.trim().split(/\s+/);
    const out = (text = '') => this.output.innerHTML += text + '<br>';

    switch (cmd.toLowerCase()) {
      case 'dir':
        const dir = this._getDir(this.cwd);
        if (dir && dir.children) {
          Object.keys(dir.children).forEach(name => {
            const item = dir.children[name];
            out(`${item.type === 'dir' ? '<DIR>' : '     '} ${name}`);
          });
        } else {
          out('Invalid directory');
        }
        break;

      case 'cd':
        if (!args[0]) return out('Usage: cd [dirname]');
        const path = this._resolvePath(args[0]);
        const dirTarget = this._getDir(path);
        if (dirTarget) {
          this.cwd = path;
        } else {
          out('Directory not found');
        }
        break;

      case 'mkdir':
        if (!args[0]) return out('Usage: mkdir [dirname]');
        const newPath = this._getDir(this.cwd);
        if (newPath.children[args[0]]) {
          out('Directory already exists');
        } else {
          newPath.children[args[0]] = { type: 'dir', children: {} };
          out(`Created directory ${args[0]}`);
        }
        break;

      case 'echo':
        out(args.join(' '));
        break;

      case 'type':
        if (!args[0]) return out('Usage: type [filename]');
        const file = this._getDir(this.cwd).children[args[0]];
        if (file && file.type === 'file') {
          out(file.content);
        } else {
          out('File not found');
        }
        break;

      case 'help':
        out('Available commands: dir, cd, mkdir, echo, type, help');
        break;

      case '':
        break;

      default:
        out(`Unknown command: ${cmd}`);
    }
  }

  _getDir(path) {
    const parts = path.replace(/\\$/, '').split('\\').filter(Boolean);
    let current = this.fs['A:\\'];
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (!current.children[part] || current.children[part].type !== 'dir') {
        return null;
      }
      current = current.children[part];
    }
    return current;
  }

  _resolvePath(input) {
    if (input.startsWith('A:\\')) return input;
    if (input === '..') {
      const parts = this.cwd.split('\\').filter(Boolean);
      if (parts.length > 1) parts.pop();
      return parts.join('\\') + '\\';
    }
    return this.cwd + input + '\\';
  }
}
