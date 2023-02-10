const express=require('express');
const router=express.Router();
const Article=require("../models/article");

//afficher les articles
router.get('/',async(req,res)=>{
    try{
        const art=await Article.find().populate("scategorieID").exec();
        //const art=await Article.find()

        res.status(200).json(art);

    }
    catch(error){
        res.status(404).json({message:error.message});
    }
    
});

//créer une nouvelle article
router.post('/',async(req,res)=>{
    const{reference,designation,prix,marque,qtestock,imageart,scategorieID}=req.body;
    const art1=new Article({reference:reference,designation:designation,prix:prix,marque:marque,qtestock:qtestock,imageart:imageart,scategorieID:scategorieID})
    try{
        await art1.save();
        res.status(200).json(art1)

    }
    catch(error){
        res.status(404).json({message:error.message});

    }
})
//chercher une article 
router.get('/:articleId',async(req,res)=>{
    try{
        const art=await Article.findById(req.params.articleId).populate("scategorieID").exec();
        //const art=await Article.findById(req.params.articleId)
        res.status(200).json(art);

    }
    catch(error){
        res.status(404).json({message:error.message});
    } 
})
//modifier une article
router.put('/:articleId',async(req,res)=>{
    const { reference,
        designation,prix,marque,qtestock,imageart,scategorieID} = req.body;
        const id = req.params.articleId;
        try {
            const art1 = {
                reference:reference,designation:designation,prix:prix,marque:marque,qtestock:qtestock,imageart:imageart,scategorieID:scategorieID, _id:id };
                await Article.findByIdAndUpdate(id, art1);
                res.json(art1);
                } catch (error) {
                res.status(404).json({ message: error.message });
                }
            });
 //supprimer une article
 router.delete('/:articleId',async(req,res)=>{
    
    const id=req.params.articleId;
    try{
        await Article.findByIdAndDelete(id);
        res.status(200).json({message:"article is deleted successfully"});
        


    }
    catch(error){
        res.status(404).json({message:error.message});
    }
    
 });               
        
   



module.exports=router;