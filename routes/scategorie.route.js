var express=require("express");
var router=express.Router();
var SCategorie=require("../models/scategorie");

//afficher la liste de sous-categories
router.get('/',async (req,res)=>{
    
    try{
        //const scat= await SCategorie.find();
        const scat= await SCategorie.find().populate("categorieID").exec();
        res.status(200).json(scat);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
});

//creer une nouvelle sous-categorie
router.post('/',async(req,res)=>{
    const {nomscategorie,imagescat,categorieID}=req.body;
    const scat1=new SCategorie({nomscategorie:nomscategorie,imagescat:imagescat,categorieID:categorieID});
    try{
        await scat1.save();
        res.status(200).json(scat1);

    }
    catch(error){
        res.status(404).json({message:error.message});
    }

});
//chercher  sous categorie
router.get('/:scategorieId',async(req,res)=>{
    try{
        //const scat=await SCategorie.findById(req.params.scategorieId);
        const scat=await SCategorie.findById(req.params.scategorieId).populate("categorieID").exec();

        res.status(200).json(scat);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
});
//modifier une sous-categorie
router.put('/:scategorieId',async(req,res)=>{
    const {nomscategorie,imagescat,categorieID}=req.body;
    const id=req.params.scategorieId;
    try{
        const scat1={
            nomscategorie:nomscategorie,imagescat:nomscategorie,categorieID:categorieID
        }
        console.log(scat1);
        await SCategorie.findByIdAndUpdate(id,scat1);
        res.status(200).json(scat1);

    }
    catch(error){
        res.status(200).json({message:error.message});
    }
});
//supprimer unes sous-catégorie
router.delete('/:scategorieId',async(req,res)=>{
    const id=req.params.scategorieId;
    try{
        await SCategorie.findByIdAndDelete(id);
        res.status(200).json({message:"sous categorie deleted successfully."})

    }
    catch(error){
        res.status(404).json({message:error.message});
    }
});
module.exports=router;

