
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Récupère toutes les commandes
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtrer les commandes par statut (e.g., success, pending)
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Numéro de la page à récupérer
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *         description: Champ par lequel trier les commandes
 *     responses:
 *       200:
 *         description: Liste des commandes obtenue avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   status:
 *                     type: string
 *                   prescription:
 *                     type: string
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         medicine:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *       404:
 *         description: Aucune commande trouvée
 */


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Récupère une commande par son ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande à récupérer
 *     responses:
 *       200:
 *         description: Commande obtenue avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 status:
 *                   type: string
 *                 prescription:
 *                   type: string
 *                 orderDate:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       medicine:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *       404:
 *         description: Commande non trouvée
 */



/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Met à jour entièrement une commande par son ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               status:
 *                 type: string
 *               prescription:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     medicine:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Commande mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Commande non trouvée
 */



/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Met à jour partiellement une commande par son ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               status: "livrée"
 *     responses:
 *       200:
 *         description: Commande partiellement mise à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Commande non trouvée
 */



/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Supprime une commande par son ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande à supprimer
 *     responses:
 *       200:
 *         description: Commande supprimée avec succès
 *       404:
 *         description: Commande non trouvée
 */



const router = require('express').Router();
const { getAll, create, getOne, update: updateOrder, delete: deleteOrder, acceptOrCancelOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.get('/:id', auth, getOne);
router.put('/:id', auth, updateOrder);
router.post('/payement/:id', auth, checkRole("pharmacist"), acceptOrCancelOrder);
router.delete('/:id', auth, deleteOrder);

module.exports = router;
