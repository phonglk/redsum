"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
describe('redsum', () => {
    describe('flat array of object', () => {
        const products = [
            { name: 'product1', stock: 3, selling: 1 },
            { name: 'product2', stock: 4, selling: 2 },
            { name: 'product3', stock: 5, selling: 3 },
            { name: 'product4', stock: 6, selling: 4 },
        ];
        describe('extractors as access keys', () => {
            it('should sum according to access keys', () => {
                const [totalStock, totalSelling] = index_1.default(products, ['stock', 'selling']);
                expect(totalStock).toBe(18);
                expect(totalSelling).toBe(10);
            });
            it('should return single entry if provided with single access string', () => {
                expect(index_1.default(products, 'stock')).toBe(18);
            });
        });
        describe('extractors as functions', () => {
            it('should sum according to functions', () => {
                const [totalStock, totalSelling] = index_1.default(products, [
                    ({ stock }) => stock * 10,
                    ({ selling }) => selling * 10,
                ]);
                expect(totalStock).toBe(180);
                expect(totalSelling).toBe(100);
            });
            it('should sum according to function', () => {
                const totalStock = index_1.default(products, ({ stock }) => stock * 10);
                expect(totalStock).toBe(180);
            });
        });
    });
    describe('nested', () => {
        const products = [
            {
                name: 'product1',
                subProducts: [
                    { name: 'product1.1', stock: 5, providers: ['provider1', 'provider2', 'provider3'] },
                    { name: 'product1.2', stock: 6, providers: ['provider1', 'provider2'] },
                ],
                sellers: [
                    { name: 'seller1', selling: 1 },
                    { name: 'seller2', selling: 2 },
                    { name: 'seller3', selling: 3 },
                ]
            },
            {
                name: 'product2',
                subProducts: [
                    { name: 'product2.1', stock: 3, providers: ['provider1', 'provider3'] },
                    { name: 'product2.2', stock: 4, providers: ['provider1'] },
                ],
                sellers: [
                    { name: 'seller1', selling: 2 },
                    { name: 'seller2', selling: 1 },
                ]
            },
            {
                name: 'product3',
                subProducts: [
                    { name: 'product3.1', stock: 8, providers: ['provider2', 'provider3'] },
                    { name: 'product3.2', stock: 9, providers: ['provider1', 'provider2'] },
                ],
                sellers: [
                    { name: 'seller2', selling: 2 },
                    { name: 'seller3', selling: 3 },
                ]
            }
        ];
        describe('sum by nested value by composing redsum', () => {
            it('should sum by nested value', () => {
                const totalStock = index_1.default(products, ({ subProducts }) => index_1.default(subProducts, 'stock'));
                expect(totalStock).toBe(35);
            });
            it('should sum by nested value2', () => {
                const totalProvider = index_1.default(products, ({ subProducts }) => index_1.default(subProducts, ({ providers }) => providers.length));
                expect(totalProvider).toBe(12);
            });
            it('demonstrate complex scenario', () => {
                const [totalStock, totalProvider, totalSeller, totalSelling] = index_1.default(products, [
                    ({ subProducts }) => index_1.default(subProducts, 'stock'),
                    ({ subProducts }) => index_1.default(subProducts, ({ providers }) => providers.length),
                    ({ sellers }) => sellers.length,
                    ({ sellers }) => index_1.default(sellers, 'selling'),
                ]);
                expect([totalStock, totalProvider, totalSeller, totalSelling]).toEqual([35, 12, 7, 14]);
            });
        });
    });
    describe('validation', () => {
        it('should throw error if an array is not provided', () => {
            expect(() => index_1.default('this is not an array', 'string')).toThrowError('first parameter must be an array');
        });
    });
});
