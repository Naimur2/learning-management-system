const schema=[
    {
        column:"username",
        type:"VARCHAR(1100)",
        nullable:false,
        unique:true
    },
    {
        column:"email",
        type:"VARCHAR(1100)",
        nullable:false,
        unique:true
    },
    {
        column:"password",
        type:"VARCHAR(1100)",
        nullable:false
    },
    {
        column:"role",
        type:"VARCHAR(1100)",
        nullable:false
    }

]

module.exports = schema;