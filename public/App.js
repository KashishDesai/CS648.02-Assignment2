class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }

    createProduct(product) {
        product.id = new Date().getTime();
        const newProducts = this.state.products.slice();
        newProducts.push(product);
        this.setState({ products: newProducts });
    }

    render() {
        return React.createElement(
            "div",
            { title: "Inner Div" },
            React.createElement(
                "h1",
                { className: "headerClass" },
                " My Company Inventory "
            ),
            React.createElement(
                "h2",
                { className: "headerClass" },
                " Showing all available products "
            ),
            React.createElement("hr", null),
            React.createElement(ProductTable, { products: this.state.products }),
            React.createElement(
                "h2",
                null,
                "Add a new product to the inventory"
            ),
            React.createElement("hr", null),
            React.createElement(ProductAdd, { createProduct: this.createProduct })
        );
    }
}

function ProductTable(props) {
    const productRows = props.products.map(product => React.createElement(ProductRow, { key: product.id, product: product }));

    return React.createElement(
        "div",
        null,
        React.createElement(
            "table",
            { className: "bordered-table" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "th",
                    null,
                    "Product Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Price"
                ),
                React.createElement(
                    "th",
                    null,
                    "Category"
                ),
                React.createElement(
                    "th",
                    null,
                    "Image"
                )
            ),
            React.createElement(
                "tbody",
                null,
                productRows
            )
        )
    );
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAddForm;
        const price = form.productPrice.value;
        const product = { product_name: form.productName.value, product_price: price.substring(1, price.length), product_category: form.productCategory.value, product_image: form.productImage.value };
        this.props.createProduct(product);
        form.productName.value = "";
        form.productPrice.value = "$";
        form.productImage.value = "";
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "form",
                { name: "productAddForm", onSubmit: this.handleSubmit },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "column" },
                        React.createElement(
                            "h4",
                            { className: "addFormTitle" },
                            "Product Category"
                        ),
                        React.createElement(
                            "select",
                            { name: "productCategory" },
                            React.createElement(
                                "option",
                                null,
                                "Shirts"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Jeans"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Jackets"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Sweaters"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Accessories"
                            )
                        ),
                        React.createElement(
                            "h4",
                            { className: "addFormTitle" },
                            "Product Name"
                        ),
                        React.createElement("input", { type: "text", name: "productName", placeholder: "Product Name" })
                    ),
                    React.createElement(
                        "div",
                        { className: "column" },
                        React.createElement(
                            "h4",
                            { className: "addFormTitle" },
                            "Product Price"
                        ),
                        React.createElement("input", { defaultValue: "$", type: "text", name: "productPrice" }),
                        React.createElement(
                            "h4",
                            { className: "addFormTitle" },
                            "Image URL"
                        ),
                        React.createElement("input", { type: "text", name: "productImage", placeholder: "Product Image" })
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    "button",
                    null,
                    "Add Product"
                )
            )
        );
    }
}

function ProductRow(props) {
    const product = props.product;

    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            product.product_name
        ),
        React.createElement(
            "td",
            null,
            "$",
            product.product_price
        ),
        React.createElement(
            "td",
            null,
            product.product_category
        ),
        React.createElement(
            "td",
            null,
            React.createElement(
                "a",
                { href: product.product_image, target: "_blank" },
                "View"
            )
        )
    );
};

const element = React.createElement(ProductList, null);

ReactDOM.render(element, document.getElementById('content'));