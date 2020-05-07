import fs from 'fs';
import path from 'path';

export default //read and write part of logs
 (myfile) => {
    let words = [];
    let output = '';
    fs.readFile( myfile, (err, data) => {
        if (err) console.log(`error occured: ${err}`);
        else {
            const list = data.toString();
            // console.log(list);
            const lines = list.split('\n');
            // console.log(lines);
            lines.forEach( line => {
                //console.log(line);
                if(line.length > 2)
                 words.push(line.split(' '));
                //console.log(words);
            })
            words.forEach( word => {
                const method = word[0];
                const url = word[1];
                output += `${method} ${url} ${word[2]} ${word[3]} \n`;
            })
        }
        fs.writeFile(path.join(__dirname, 'newlog.log'), output, err => {
            if(err) throw err
        })
    });
}