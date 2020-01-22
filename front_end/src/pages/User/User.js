import React, { Component } from 'react';
import './User.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import { actFetchProductsRequest, actDeleteProductRequest } from '../../actions/index';

class User extends Component {

    componentDidMount() {
        // Gọi trước khi component đc render lần đầu tiên
        this.props.fetchAllProducts();
    }

    render() {

        var { products } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="media">
                        <a className="pull-left">
                                <img className="media-object dp img-circle" src="http://www.huffmancode.com/img/hardik.jpg" style={{width: "100px", height:"100px"}} alt="sdf" />
                            </a>
                            <div className="media-body">
                                <h4 className="media-heading">Hardik Sondagar <small> India</small></h4>
                                <h5>Software Developer at <a href="http://gridle.in">Gridle.in</a></h5>
                                <hr style={{margin:"8px auto"}} />

                                <span className="label label-default">HTML5/CSS3</span>
                                <span className="label label-default">jQuery</span>
                                <span className="label label-info">CakePHP</span>
                                <span className="label label-default">Android</span>
                            </div>
                        </div>

                    </div>



                </div>
                <div classNameName="row">
                    <div classNameName="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Link to="/product/add" classNameName="btn btn-primary mb-5">
                            <i classNameName="glyphicon glyphicon-plus"></i> Thêm Sản Phẩm
                        </Link>
                        <ProductList>
                            {this.showProducts(products)}
                        </ProductList>
                    </div>
                </div>
            </div>
        );
    }

    showProducts(products) {
        var result = null;
        var { onDeleteProduct } = this.props;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return <ProductItem product={product} key={index} index={index} onDeleteProduct={onDeleteProduct} />
            });
        }
        return result;
    }

}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest());
        },
        onDeleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
