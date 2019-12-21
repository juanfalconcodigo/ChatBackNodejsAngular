import {Router,Request,Response} from 'express';
import Server from '../classes/server';
const router=Router();

router.get('/mensaje',(req:Request,res:Response)=>{
    res.status(200).json({
        ok:true,
        message:'get'
    });

});

router.post('/mensaje/:id',(req:Request,res:Response)=>{
    const{de,mensaje}=req.body;
    const{id}=req.params;
    const payload={de,mensaje}
    const server=Server.instance;
    server.io.in(id).emit('mensaje-privado',payload);
    res.status(201).json({
        ok:true,
        de,
        mensaje,
        id
    });
});

router.post('/mensaje',(req:Request,res:Response)=>{
    const {de,mensaje}=req.body;
    const payload={de,mensaje};
    const server=Server.instance;
    server.io.emit('mensaje-nuevo',payload);
    res.status(201).json({
        ok:true,
        de,
        mensaje
    }); 
});



router.put('/mensaje/:id',(req:Request,res:Response)=>{
    let {id}=req.params;
    let {data}=req.body;
    res.status(202).json({
        ok:true,
        message:'put',
        id,
        data
    })

});
router.delete('/mensaje/:id',(req:Request,res:Response)=>{
    let {id}=req.params;
    res.status(202).json({
        ok:true,
        message:'delete',
        id
    })

});


export default router;