/**
 * @swagger
 * /prescriptions:
 *   get:
 *     summary: Récupère toutes les prescriptions
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Tri des prescriptions par date
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrer les prescriptions par date de création
 *     responses:
 *       200:
 *         description: Liste des prescriptions obtenue avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prescription'
 */


/**
 * @swagger
 * /prescriptions/{id}:
 *   get:
 *     summary: Récupère une prescription par son ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la prescription à récupérer
 *     responses:
 *       200:
 *         description: Prescription obtenue avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 *       404:
 *         description: Prescription non trouvée
 */


/**
 * @swagger
 * /prescriptions:
 *   post:
 *     summary: Crée une nouvelle prescription
 *     tags: [Prescriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient
 *               - doctor
 *               - medicines
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *               medicines:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     medicine:
 *                       type: string
 *                     dosage:
 *                       type: string
 *                     frequency:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Prescription créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 */



/**
 * @swagger
 * /prescriptions/{id}:
 *   put:
 *     summary: Met à jour entièrement une prescription
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prescription'
 *     responses:
 *       200:
 *         description: Prescription mise à jour avec succès
 *       404:
 *         description: Prescription non trouvée
 */





/**
 * @swagger
 * /prescriptions/{id}:
 *   patch:
 *     summary: Met à jour partiellement une prescription
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               status: "used"
 *     responses:
 *       200:
 *         description: Prescription partiellement mise à jour
 *       404:
 *         description: Prescription non trouvée
 */




/**
 * @swagger
 * /prescriptions/{id}:
 *   delete:
 *     summary: Supprime une prescription par son ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prescription supprimée avec succès
 *       404:
 *         description: Prescription non trouvée
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Prescription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         patient:
 *           type: string
 *         doctor:
 *           type: string
 *         status:
 *           type: string
 *         notes:
 *           type: string
 *         medicines:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               medicine:
 *                 type: string
 *               dosage:
 *                 type: string
 *               frequency:
 *                 type: string
 *               duration:
 *                 type: string
 *               quantity:
 *                 type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */