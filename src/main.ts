import each from 'async/each'

declare function require(name: string): any;
declare interface CB<T> {
    (value: T): void
}

const glob = require('glob')
const path = require('path')
const async = require('async')

const args = {
    root: 'test'
}

glob(`${args.root}/partials/**/*.tpl`, (err, files: string[]) => {

async.each(files, )

    files.forEach(file => {
        const partialName = path.basename(file).split('.')[0]
        const data = loadData(file)
    })
})

function loadData(tplPath: string, cb: CB<any>): any {
    try {
        const inp = require(tplPath.replace('.tpl', '.js'))
        if (typeof inp === 'function') {
            inp(cb)
        }
        else {
            cb(inp)
        }
    }
    catch (ex) {
        cb({})
    }
}