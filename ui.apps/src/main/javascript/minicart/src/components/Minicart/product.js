/*******************************************************************************
 *
 *    Copyright 2019 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/
import React, { useState, useMemo, useCallback } from 'react';
import { Price } from '@magento/peregrine';
import classes from './product.css';

import { transparentPlaceholder } from '../../utils/transparentPlaceholder';
import makeUrl from '../../utils/makeUrl';
import Kebab from './kebab';
import Section from './section';

const imageWidth = 80;
const imageHeight = 100;

const Product = props => {
    const {
        beginEditItem,
        item: { product, quantity } = { product: undefined, quantity: 0 },
        removeItemFromCart
    } = props;

    const { image, name, options, price } = product;

    console.log(`Product  is ${product}`);
    const [isLoading, setIsLoading] = useState(false);

    const { value, currency } = price.regularPrice.amount;

    const mask = isLoading ? <div className={classes.mask} /> : null;

    const productImage = useMemo(() => {
        const src =
            image && image.url
                ? makeUrl(image.url, { type: 'image-product', width: imageWidth, height: imageHeight })
                : transparentPlaceholder;
        return <img alt={name} className={classes.image} placeholder={transparentPlaceholder} src={src} />;
    });

    const handleEditItem = useCallback(() => {
        beginEditItem(product);
    }, [beginEditItem, product]);

    return (
        <li className={classes.root}>
            {productImage}
            <div className={classes.name}>{name}</div>
            <div className={classes.quantity}>
                <div className={classes.quantityRow}>
                    <span>{quantity}</span>
                    <span className={classes.quantityOperator}>{'×'}</span>
                    <span className={classes.price}>
                        <Price currencyCode={currency} value={value} />
                    </span>
                </div>
            </div>
            {mask}
            <Kebab>
                <Section text="Edit item" onclick={handleEditItem} icon="Edit2" />
                <Section text="Remove item" icon="Trash" />
            </Kebab>
        </li>
    );
};

export default Product;