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
        name: "description",
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
        label: "Price",
        name: "price",
        type: "number",
        placeholder: "Enter product price"
    },
    {
        label: "Sale Price",
        name: "salePrice",
        ComponentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)"
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
]


export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shop/listing'
    },
    {
        id: 'women',
        label: 'Women',
        path: '/shop/listing'
    },
    {
        id: 'kids',
        label: 'Kids',
        path: '/shop/listing'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/listing'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/listing'
    },
]

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
    Category: [
        { id: 'men', label: 'Men' },
        { id: 'women', label: 'Women' },
        { id: 'kids', label: 'Kids' },
        { id: 'footwears', label: 'Men' },
        { id: 'footwears', label: 'Footwears' },
        { id: 'accessories', label: 'Accessories' },
    ],
    Brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
    ]
}

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];