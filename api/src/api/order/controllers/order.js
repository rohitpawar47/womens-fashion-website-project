'use strict';
// const express = require('express');
const stripe = require('stripe')('sk_test_51MgRuqSDqe9LvfgqIerPwyELLFNAzPwJXvBP4oKAnTZYL0joWPotTHwrvd0QFClcxD3o9oIGnqAgjsPdA0WrhSbH00Xqy9IpJS');
/**
 * order controller
 */
// require('dotenv').config();
const { createCoreController } = require("@strapi/strapi").factories;
// module.exports = createCoreController("api::order.order");
// module.exports = createCoreController("api::order.order", ({ strapi }) => ({
//     async create(ctx) {
//         const { products } = ctx.request.body;
//         try {
//             const lineItems = await Promise.all(
//                 products.map(async (product) => {
//                     const item = await strapi
//                         .service("api::item.item")
//                         .findOne(product.id);

//                     return {
//                         price_data: {
//                             currency: "usd",
//                             product_data: {
//                                 name: item.name,
//                             },
//                             unit_amount: Math.round(item.price * 100),
//                         },
//                         quantity: product.quantity,
//                     };
//                 })
//             );

//             const session = await stripe.checkout.sessions.create({
//                 shipping_address_collection: { allowed_countries: ['US', 'CA'] },
//                 payment_method_types: ["card"],
//                 mode: "payment",
//                 success_url: 'http://localhost:3000/success=true',
//                 cancel_url: 'http://localhost:3000/success=false',
//                 line_items: lineItems,
//             });

//             await strapi
//                 .service("api::order.order")
//                 .create({ data: { products, stripeId: session.id } });

//             return { stripeSession: session };
//         } catch (error) {
//             ctx.response.status = 500;
//             return { error };
//         }
//     },
// }));
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        const { products } = ctx.request.body;
        // retrieve item information
        const lineItems = await Promise.all(
            products.map(async (product) => {
                const item = await strapi
                    .service("api::product.product")
                    .findOne(product.id);

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: product.quantity,
                };
            })
        );
        try {

            // const endpoint = await stripe.webhookEndpoints.create({
            //     url: 'https://example.com/my/webhook/endpoint',
            //     enabled_events: [
            //         'charge.failed',
            //         'charge.succeeded',
            //     ],
            // });

            // create a stripe session
            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: { allowed_countries: ['US', 'CA'] },
                payment_method_types: ["card"],
                mode: "payment",
                success_url: "http://localhost:3000/success",
                cancel_url: "http://localhost:3000?success=false",
                line_items: lineItems,
            });

            // create the item
            await strapi
                .service("api::order.order")
                .create({
                    data: {
                        products,
                        stripeId: session.id,
                    },
                });

            // return the session id
            return { id: session };
        } catch (error) {
            ctx.response.status = 500;
            return { error: { message: "There was a problem creating the charge" } };
        }
    },
}));
