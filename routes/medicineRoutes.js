/**
 * @swagger
 * 
 *  /medicines:
 *  get:
 *    summary: Récupère tous les médicaments
 *    tags: [Medicines]
 *    parameters:
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *     - in: query
 *       name: search
 *       schema:
 *         type: string
 *         default: ""
 *     - in: query
 *       name: sort
 *       schema:
 *         type: string
 *         default: asc
 *     - in: query
 *       name: understock
 *       schema:
 *         type: number
 *    responses:
 *      200:
 *        description: Liste des médicaments obtenue avec succès
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
 *                  price:
 *                    type: number
 *                    format: float
 *                  stock:
 *                    type: integer
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *                  updatedAt:
 *                    type: string
 *                    format: date-time
 */



/**
 * @swagger
 * /medicines/{id}:
 *   get:
 *     summary: Récupère un médicament par son ID
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du médicament à récupérer
 *     responses:
 *       200:
 *         description: Médicament obtenu avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 stock:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Médicament non trouvé
 */



/**
 * @swagger
 * /medicines:
 *  post:
 *    summary: Crée un nouveau médicament
 *    tags: [Medicines]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              price:
 *                type: number
 *                format: float
 *              stock:
 *                type: integer
 *    responses:
 *      201:
 *        description: Médicament créé avec succès
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *                  format: float
 *                stock:
 *                  type: integer
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 */


/**
 * @swagger
 * /medicines/bulk:
 *  post:
 *    summary: Crée plusieurs médicaments
 *    tags: [Medicines]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *                  format: float
 *                stock:
 *                  type: integer
 *    responses:
 *      201:
 *        description: Médicaments créés avec succès
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
 *                  price:
 *                    type: number
 *                    format: float
 *                  stock:
 *                    type: integer
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *                  updatedAt:
 *                    type: string
 *                    format: date-time
 */


/**
 * @swagger
 * /medicines/{id}:
 *  put:
 *    summary: Met à jour un médicament par son ID
 *    tags: [Medicines]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID du médicament à mettre à jour
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              price:
 *                type: number
 *                format: float
 *              stock:
 *                type: integer
 *    responses:
 *      200:
 *        description: Médicament mis à jour avec succès
 */


/** * @swagger
 * /medicines/{id}:
 *  patch:
 *    summary: Met à jour partiellement un médicament par son ID
 *    tags: [Medicines]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID du médicament à mettre à jour partiellement
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              price:
 *                type: number
 *                format: float
 *              stock:
 *                type: integer
 *    responses:
 *      200:
 *        description: Médicament mis à jour partiellement avec succès
 */

/**
 * @swagger
 * /medicines/{id}:
 *  delete:
 *    summary: Supprime un médicament par son ID
 *    tags: [Medicines]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID du médicament à supprimer
 *    responses:
 *      200:
 *        description: Médicament supprimé avec succès
 *      404:
 *        description: Médicament non trouvé
 */


const router = require('express').Router();
const { getAll, getOne, create, bulkCreate, update, patch: patchMedicine, delete: deleteMedicine } = require('../controllers/medicineController');
const auth = require('../middleware/auth');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, create);
router.post('/bulk', auth, bulkCreate);
router.put('/:id', auth, update);
router.patch('/:id', auth, patchMedicine);
router.delete('/:id', auth, deleteMedicine);

module.exports = router;
