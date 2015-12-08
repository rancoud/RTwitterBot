// init variables
fs = require('fs');
listPids = [];
options = [];

//read pids directory
fs.readdirSync(__dirname + '/pids/').forEach(function(file) {
  if (file.match(/\.pid$/) !== null) {
    listPids.push({
      pid: file.replace('.pid', ''),
      file: __dirname + '/pids/' + file,
      content: fs.readFileSync(__dirname + '/pids/' + file, 'utf8')
    });
  }
});

// get options
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    options.push(val);
  }
});

// check if a pid is running
function isRunning(pid) {
  try {
    return process.kill(pid, 0);
  }
  catch (e) {
    return e.code === 'EPERM';
  }
}

function kill(pid) {
  try {
    return process.kill(pid, 'SIGINT');
  }
  catch (e) {
    return false;
  }
}

// suppression des pids inexistants
var _temp = [];
for (var i = 0; i < listPids.length; i++) {
  if(!isRunning(listPids[i].pid)) {
    fs.unlinkSync(listPids[i].file);
  }
  else {
    _temp.push(listPids[i]);
  }
}
listPids = _temp;

// show list pids
if(options.length < 1) {
  if(listPids.length > 0) {
    console.log('List of pids:');
    for (var i = 0; i < listPids.length; i++) {
      console.log(listPids[i].pid + ' : ' + listPids[i].content);
    }
  }
  else {
    console.log('No job running');
  }
}

// option kill + pid -> kill pid
if(options[0] === 'kill' && options[1] !== 'all' ) {
  for (var i = 0; i < listPids.length; i++) {
    if(options[1] === listPids[i].pid) {
      if(kill(listPids[i].pid)) {
        console.log('[SUCCESS] - Kill ' + listPids[i].pid);
        fs.unlinkSync(listPids[i].file);
      }
      else {
        console.log('[ERROR] - Not Kill ' + listPids[i].pid);
      }
    }
  }
}

// option kill + all -> kill all pids
if(options[0] === 'kill' && options[1] === 'all' ) {
  for (var i = 0; i < listPids.length; i++) {
    if(kill(listPids[i].pid)) {
      console.log('[SUCCESS] - Kill ' + listPids[i].pid);
      fs.unlinkSync(listPids[i].file);
    }
    else {
      console.log('[ERROR] - Not Kill ' + listPids[i].pid);
    }
  }
}
