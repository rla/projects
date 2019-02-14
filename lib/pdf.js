const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const concat = require('concat-stream');
const PDFFont = fs.readFileSync(
    path.join(__dirname, '..', 'fonts', 'DejaVuSans.ttf'));

// Generates a PDF file from the answers. The
// file is returned as a buffer.

module.exports = ({title, answers}) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            bufferPages: true,
            margins: {
                top: 72,
                left: 72,
                bottom: 72,
                right: 72
            },
            size: 'A4'
        });
        const piped = doc.pipe(concat((buffer) => {
            resolve(buffer);
        }));
        doc.font(PDFFont);
        // Metadata.
        doc.info.Title = title;
        doc.info.Author = 'Describer <https://describer.rlaanemets.com>';
        doc.fontSize(25);
        doc.text(title);
        doc.moveDown(1);
        doc.fontSize(11);
        for (const answer of answers) {
            doc.fillColor('#333333');
            if (answer.type === 'topic') {
                doc.fontSize(16);
                doc.moveDown(0.5);
                doc.text(answer.text);
                doc.moveDown(0.5);
            } else {
                doc.fontSize(11);
                doc.text(answer.text, {
                    continued: true
                });
                if (answer.answer === 'yes') {
                    doc.fillColor('#006600');
                    doc.text(' ✔ Yes');
                } else if (answer.answer === 'no') {
                    doc.fillColor('#660000');
                    doc.text(' × No');
                } else if (answer.answer === 'skip') {                    
                    doc.fillColor('#660066');
                    doc.text(' » Skipped');
                } else if (answer.answer === 'dnk') {
                    doc.fillColor('#666600');
                    doc.text(' Do not know');
                } else {
                    doc.text('');
                }            
                doc.moveDown(0.5);
            }            
        }
        doc.moveDown(1.0);
        doc.fontSize(10);
        doc.fillColor('#666666');
        doc.text('This document was produced by using the' +
            ' application running at ', {
                lineGap: 5,
                continued: true
            });
        doc.fillColor('#006666');
        doc.text('https://project.rlaanemets.com', {
            link: 'https://project.rlaanemets.com',
            underline: true,
            continued: true
        });
        doc.fillColor('#666666');
        doc.text('. The application helps to find out the most basic' +
            ' requirements of a software development project. The author' +
            ' of the application assumes no responsibility' +
            ' for the correctness of these answers.', {
                link: '',
                underline: false
            });
        doc.flushPages();
        doc.end();
        piped.on('error', (err) => { reject(err); });
    });
};
