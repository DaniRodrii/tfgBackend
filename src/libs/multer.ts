import multer from 'multer';

const almacenarImg = multer.diskStorage({
    destination: process.cwd()+`/src/uploads`,
    filename:(req, file ,cb) => {
        const extension = file.originalname.split('.').pop();
        const fileName=Date.now();
        cb(null, `${fileName}.${extension}`)
    }, 
});



const almacen = multer({storage: almacenarImg})

module.exports = almacen; 