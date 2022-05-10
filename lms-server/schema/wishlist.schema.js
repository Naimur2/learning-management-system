const schema=[
    {
        column:"productId",
        type:"VARCHAR(1100)",
        nullable:false,
        unique:true
    },
    {
        column:"customerId",
        type:"VARCHAR(1100)",
        nullable:false
    },
    {
        column:"datetime",
        type:"VARCHAR(1100)",
        nullable:false
    }

]

module.exports = schema;