const each = require('async/each')
const fs = require('fs')
const glob = require('glob')
const mts = require('mustache.ts')
const parallel = require('async/parallel')
const path = require('path')
const waterfall = require('async/waterfall')

function red(rootFolder, options, cb) {

    const outpFolder = options.outpFolder || './dist'

    rootFolder = rootFolder + (rootFolder.endsWith('/') ? '' : '/')

    const helpers = {}
    const partials = {}

    // Helper to find and register templates
    function register(path, cb) {
        glob(`${path}**/*.tpl`, (err, files) => {

            each(files, (file, cb) => {
                const pieces = file.split(/\./g)
                const partialName = pieces.slice(0, pieces.length - 1).join('.').substring(rootFolder.length).replace(/\//g, '_')
                console.log(`  Partial file ${partialName}`)

                fs.readFile(file, { encoding: 'utf8' }, (err, text) => {
                    const fn = mts.makePartial(mts.compile(text), helpers, partials)

                    partials[partialName] = frame => {
                        return fn(frame)
                    }
                    cb()
                })
            }, cb)
        })
    }

    console.log(`Registering templates`)
    waterfall([

        // Find and register layouts
        cb => register(`${rootFolder}layouts/`, cb),

        // Find and register pages
        cb => register(`${rootFolder}pages/`, cb),

        // Find and register components 
        cb => register(`${rootFolder}components/`, cb)

    ], err => {

        console.log(`Compiling pages`)

        const template = mts.makeTemplate(mts.compile(`{{>layout}}`), helpers, partials)

        glob(`${rootFolder}/compositions/**/*.js`, (err, files) => {
            each(files, (file, cb) => {
                const pieces = file.split(/\./g)
                const compositionName = pieces.slice(0, pieces.length - 1).join('.').substring(rootFolder.length)
                const dataPath = pieces.slice(0, pieces.length - 1).join('.')

                console.log(`  Building page from ${compositionName}`)

                const a = require('.' + dataPath)
                const data = typeof (a) === 'function' ? a() : a;

                const outp = template(data)
            }, cb)
        })

    })

}

red('./test', {}, () => {
    console.log()
    console.log('blubb')
})

module.exports = red
