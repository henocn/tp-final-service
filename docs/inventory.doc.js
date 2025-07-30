/**
 * @swagger
 * /inventory/sales-rate:
 *   get:
 *     summary: Récupère les produits avec leur taux de vente
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Liste obtenue avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   salesRate:
 *                     type: number
 * 
 * 
 * /inventory/total-sales:
 *   get:
 *     summary: Récupère le total des ventes par produit
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Total des ventes obtenu avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   totalSales:
 *                     type: number
 * 
 * 
 * /inventory/patients/prescriptions:
 *  get:
 *    summary: Récupère les patients avec leurs prescriptions
 *    tags: [Inventory]
 *    responses:
 *      200:
 *        description: Liste des patients avec leurs prescriptions obtenue avec succès
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  prescriptionsCount:
 *                    type: number
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 * 
 * /inventory/doctors/prescriptions:
 *  get:
 *   summary: Récupère les docteurs avec leurs prescriptions par patient
 *   tags: [Inventory]
 *   responses:
 *     200:
 *       description: Liste des docteurs avec leurs prescriptions par patient obtenue avec succès
 *       content:
 *           application/json:
 *               schema:
 *                   type: array
 *                   items:
 *                       type: object
 *                       properties:
 *                           _id:
 *                               type: string
 *                           prescriptionsCount:
 *                               type: number
 *                           name:
 *                               type: string
 *                           email:
 *                               type: string
 * 
 * /inventory/sales:
 *   get:
 *     summary: Récupère les ventes de l'inventaire par période
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Liste des ventes obtenue avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 *                   totalSales:
 *                     type: number
 * 
 */