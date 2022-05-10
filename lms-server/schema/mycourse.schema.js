const schema=[
    {
        column:"userId",
        type:"VARCHAR(1100)",
        nullable:false,
        unique:true
    },
    {
        column:"courseId",
        type:"VARCHAR(1100)",
        nullable:false,
        unique:true
    },
    

]

module.exports = schema;