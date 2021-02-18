const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    // 1A)Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['sort', 'page', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B)Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    /*const query = await Tour.find({
      duration: 5,
      difficulty: 'easy',
    });*/

    /*const query = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');*/

    //const tours = await Tour.find();

    //2)Sorting
    console.log(req.query.sort);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log('sortBy');
      query = query.sort(sortBy);
      console.log(query);
    } else {
      query = query.sort('-createdAt');
    }
    //EXECUTE THE QUERY
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  //res.status(200).json({
  //  status: 'success',
  //  data: tour,
  //});
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.params.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
