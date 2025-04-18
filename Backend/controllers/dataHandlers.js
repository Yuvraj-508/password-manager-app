const passwordEntry = require("../models/data");


async function handlePassPostReq(req, res) {
    const { platform, username, password, notes } = req.body;
    const userId = req.user._id;
    const newEntry = await passwordEntry.create({ userId, platform, username, password, notes });
    res.json(newEntry);
}

async function handlePassGetReq(req, res) {
    const entries = await passwordEntry.find({ userId: req.user._id });
    res.json(entries);
}
  
 // PUT /passwords/:id → Update a password entry
 
async function handlePassUpdate(req, res) {
    try {
        const { id } = req.params;
        const { platform, username, password, notes } = req.body;
        
        const updatedEntry = await passwordEntry.findByIdAndUpdate(
          id,
          { platform, username, password },
          { new: true } // Return updated doc
        );
    
        if (!updatedEntry) return res.status(404).json({ message: "Entry not found" });
    
        res.json(updatedEntry);
      } catch (err) {
        res.status(500).json({ message: "Error updating password", error: err });
      }
}

 
async function handlePassDelete(req, res) {
    try {
        const { id } = req.params;
    
        const deletedEntry = await passwordEntry.findByIdAndDelete(id);
    
        if (!deletedEntry) {
          return res.status(404).json({ message: "Entry not found" });
        }
    
        res.json({ message: "Password deleted successfully", deletedEntry });
      } catch (err) {
        res.status(500).json({ message: "Error deleting password", error: err });
      }
}


module.exports={
    handlePassPostReq,
    handlePassGetReq,
    handlePassUpdate,
    handlePassDelete

}

  
