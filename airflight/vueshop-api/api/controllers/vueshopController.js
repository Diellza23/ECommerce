export default{
    list:(req,res) => {
    
        return res.json([
            {
                type: 'House',
                rooms: 3,
            },
            {
                type: 'House',
                rooms: 2,
            },
            {
                type: 'House',
                rooms: 4,
            }
        ])
    }
}