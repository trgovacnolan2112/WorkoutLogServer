const Express= require('express');
const router= Express.Router();
const validateSession= require('../middleware/validate-jwt');
const {SynthModel}= require('../models');
router.post('/create', validateSession, async(req, res) =>{
    const{ nameOfSynth, baseOfSynth, skin, eyes, hair, height} = req.body;
    try{const Synth= await SynthModel.create({nameOfSynth,baseOfSynth,skin,eyes,hair,height});
      res.status(201).json({message: "Synth successfully created",Synth});
    } catch(err){
      res.status(500).json({message: `failed to create Synth: ${err}`})}});
      module.exports = router;
router.delete('/:id', async (req, res) => {
        try {const query ={where: {id: req.params.id}}
        await SynthModel.destroy(query)
        res.status(200).json({message: "Synth Destroyed"})}
        catch(err){res.status(500).json({message:"Error Incineration"})}})