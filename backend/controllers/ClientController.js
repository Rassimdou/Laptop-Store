import Client from "../models/Client";



export const getAllClients = async (req, res) => {
   try {
     const allClient = await Client.find();
     res.status(200).json(allClient);
   } catch (error) {
    console.log('Error fetching clients:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
    
   }
    
}