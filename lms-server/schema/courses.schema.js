const schema=[
    {
        column:"course_name",
        type:"VARCHAR(1100)",
        nullable:false,
        unique:true
    },
    {
        column:"description",
        type:"VARCHAR(1100)",
        nullable:false,
        unique:true
    },
    {
        column:"price",
        type:"VARCHAR(1100)",
        nullable:false
    },
    {
        column:"image",
        type:"VARCHAR(1100)",
        nullable:false
    },
    {
        column:"offer_price",
        type:"VARCHAR(1100)",
        nullable:false
    },
    {
        column:"ratings",
        type:"VARCHAR(1100)",
        nullable:false
    },
    {
        column:"category",
        type:"VARCHAR(1100)",
        nullable:false
    },
    {
        column:"includes",
        type:"VARCHAR(1100)",
        nullable:false
    },

]

module.exports = schema;