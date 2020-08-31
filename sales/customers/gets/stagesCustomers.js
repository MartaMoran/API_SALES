const stagesCustomers = () => {
  let array = [];

  array = [
    ...array,
    {
      $addFields: {
        female: {
          $cond: {
            if: { $eq: ["$customer.gender", "F"] },
            then: 1,
            else: 0,
          },
        },
      },
    },
  ];
  array = [
    ...array,
    {
      $addFields: {
        male: {
          $cond: {
            if: { $eq: ["$customer.gender", "M"] },
            then: 1,
            else: 0,
          },
        },
      },
    },
  ];

  array = [
    ...array,
    {
      $group: {
        _id: "clients",
        Customers: { $push: "$customer" },
        femaleGender: { $sum: "$female" },
        maleGender: { $sum: "$male" },
        AverageSatisfaction: { $avg: "$customer.satisfaction" },
        AgeMax: { $max: "$customer.age" },
        AgeMin: { $min: "$customer.age" },
        AgeAvg: { $avg: "$customer.age" },
      },
    },
  ];

  return array;
};

export default stagesCustomers;
