import { Request, Response } from 'express';
import { products } from '../models/productschema';

class ProductController {
	async getProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (id) {
				const singleProduct = await products.findById(id);
				if (singleProduct === null) {
					return res
						.status(404)
						.json({ error: 'No existe un producto con este id' });
				}
				return res.json({ product: singleProduct });
			} else {
				const get = await products.find();
				if (get.length === 0) {
					return res.status(404).json({ error: 'No hay productos cargados' });
				}
				return res.json({ products: get });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async addProduct(req: Request, res: Response) {
		try {
			const { title, price, thumbnail } = req.body;

			if (!title || !price || !thumbnail)
				return res.status(400).json({ error: 'Falta el body' });

			const product = new products({ title, price, thumbnail });
			const newProduct = await product.save();

			return res.json({ newProduct });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async updateProduct(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { title, price, thumbnail } = req.body;

			if (!title || !price || !thumbnail)
				return res.status(400).json({ error: 'Fala el body' });

			const item = await products.findByIdAndUpdate(
				id,
				{ $set: req.body },
				{ runValidators: true }
			);
			if (item === null) {
				return res.status(404).json({
					error: 'No existe producto con ese id',
				});
			} else {
				const updatedProduct = await products.findById(id);
				return res.json({ updatedProduct });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async deleteProduct(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const product = await products.findByIdAndDelete(id);
			if (product === null) {
				return res.status(404).json({
					error: 'No existe producto con ese id',
				});
			} else {
				return res.json({ productoBorrado: product });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}
}

export const productController = new ProductController();
