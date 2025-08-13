export const registerFormControls = [
    {
        name: "userName",
        label: "User Name",
        placeholder: "Enter your user name.",
        ComponentType: "input",
        type: "text"
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        ComponentType: "input",
        type: "email"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        ComponentType: "input",
        type: "password"
    }
];


export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        ComponentType: "input",
        type: "email"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        ComponentType: "input",
        type: "password"
    }
]


export const addProductFormElement = [
    {
        label: "Title",
        name: "title",
        ComponentType: "input",
        type: "text",
        placeholder: "Enter product title"
    },
    {
        label: "Description",
        name: "discription",
        ComponentType: "textarea",
        placeholder: "Enter product description"
    },
    {
        label: "Category",
        name: "category",
        ComponentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ]
    },
    {
        label: "Brand",
        name: "brand",
        ComponentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
        ]
    },
    {
        label:"Price",
        name:"price",
        type:"number",
        placeholder:"Enter product price"
    },
    {
        label:"Sale Price",
        name:"salePirce",
        ComponentType:"input",
        type:"number",
        placeholder:"Enter sale price (optional)"
    },
     {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
]
