let TestModel = require("../models/testpaper");
let TraineeEnterModel = require("../models/trainee");
let AnswerSheetModel = require("../models/answersheet");
let OptionModel = require("../models/option");
let SubjectModel = require("../models/subject");
let ResultModel = require("../models/results");
const QuestionModel = require("../models/question");

var mongoose = require("mongoose");

let create = (req, res, _) => {
  const { _id } = req.body || null;

  if (req.user.type === "TRAINER") {
    req.check("type", "invalid type").notEmpty();
    req.check("title", "Enter title").notEmpty();
    req.check("questions", "Enter questions").notEmpty();

    var errors = req.validationErrors();
    if (errors)
      res.json({
        success: false,
        message: "Invalid inputs",
        errors,
      });
    else {
      const {
        type,
        title,
        questions,
        difficulty,
        organisation,
        duration,
        subject,
      } = req.body;

      if (_id) {
        TestModel.findOneAndUpdate(
          { _id: _id },
          {
            title: title,
            questions: questions,
          }
        )
          .then(() => {
            res.json({
              success: true,
              message: "Testpaper has been updated!",
            });
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Unable to update testpaper!",
            });
          });
      } else {
        TestModel.findOne({ title, type, testBegins: 0 }, { status: 0 }).then(
          (info) => {
            if (!info) {
              const newTest = TestModel({
                type,
                title,
                questions,
                difficulty,
                organisation,
                duration,
                subject,
                createdBy: req.user._id,
              });

              newTest
                .save()
                .then((test) => {
                  res.json({
                    success: true,
                    message: "New testpaper created successfully!",
                    testId: test._id,
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    success: false,
                    message: "Unable to create new testpaper!",
                  });
                });
            } else {
              res.json({
                success: false,
                message: "This testpaper already exists!",
              });
            }
          }
        );
      }
    }
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const createWithAutoGeneratedQuestions = (req, res, _) => {
  const { _id } = req.body || null;

  if (req.user.type === "TRAINER") {
    req.check("type", "invalid type").notEmpty();
    req.check("title", "Enter title").notEmpty();

    var errors = req.validationErrors();
    if (errors)
      res.json({
        success: false,
        message: "Invalid inputs",
        errors,
      });
    else {
      const {
        type,
        title,
        difficulty,
        organisation,
        duration,
        subject,
        tags,
        numberOfQuestions,
      } = req.body;

      if (_id) {
        TestModel.findOneAndUpdate({ _id: _id }, { title: title })
          .then(() => {
            res.json({
              success: true,
              message: "Testpaper has been updated!",
            });
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Unable to update testpaper!",
            });
          });
      } else {
        TestModel.findOne(
          {
            title,
            type,
            testBegins: 0,
          },
          { status: 0 }
        ).then(async (info) => {
          if (!info) {
            // const tagIds = tags.map((tagId) => mongoose.Types.ObjectId(tagId));
            const questions = await QuestionModel.aggregate([
              {
                $match: {
                  subject: mongoose.Types.ObjectId(subject),
                  tags: { $in: tags },
                  status: true,
                },
              },
              { $sample: { size: parseInt(numberOfQuestions, 10) } },
            ]);

            if (questions.length >= numberOfQuestions) {
              const newTest = TestModel({
                type,
                title,
                questions,
                difficulty,
                organisation,
                duration,
                subject,
                createdBy: req.user._id,
              });

              newTest
                .save()
                .then((test) => {
                  res.json({
                    success: true,
                    message: "New testpaper created successfully!",
                    testId: test._id,
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    success: false,
                    message: "Unable to create new testpaper!",
                  });
                });
            } else {
              res.json({
                success: false,
                message: "Not found enough question",
              });
            }
          } else {
            res.json({
              success: false,
              message: "This testpaper already exists!",
            });
          }
        });
      }
    }
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const get = (req, res, _) => {
  const { _id } = req.params;

  TestModel.findOne(
    { _id, status: 1 },
    { createdAt: 0, updatedAt: 0, status: 0 }
  )
    .populate("createdBy")
    .populate("subject")
    .populate("questions")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        model: OptionModel,
      },
    })
    .exec(function (err, test) {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      } else {
        res.json({
          success: true,
          message: `Success`,
          data: test,
        });
      }
    });
};

const getAll = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    TestModel.find(
      {
        createdBy: req.user._id,
        status: 1,
      },
      { status: 0 }
    )
      .populate("questions", "body")
      .populate({
        path: "subjects",
        model: SubjectModel,
      })
      .populate({
        path: "questions",
        populate: {
          path: "options",
          model: OptionModel,
        },
      })
      .exec(function (err, test) {
        if (err)
          res.status(500).json({
            success: false,
            message: "Unable to fetch data",
          });
        else
          res.json({
            success: true,
            message: "Success",
            data: test,
          });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const getTrainerTest = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { subjects } = req.body;

    TestModel.find({ subject: { $in: subjects } })
      .populate({
        path: "questions",
        model: "QuestionModel",
        populate: {
          path: "options",
          model: "OptionModel",
        },
      })

      .populate({
        path: "questions",
        model: "QuestionModel",
        populate: {
          path: "subject",
          model: "SubjectModel",
        },
      })
      .populate("subject")
      .then((test) => {
        if (test.length === 0) {
          res.json({
            success: false,
            message: "This test does't exist!",
          });
        } else {
          res.json({
            success: true,
            message: "Success",
            data: test,
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const remove = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { _id } = req.body;

    TestModel.findOneAndUpdate({ _id }, { status: 0 })
      .then(() => {
        res.json({
          success: true,
          message: "Test has been deleted",
        });
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to delete test",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const updateRegistrationStatus = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { id, status } = req.body;

    TestModel.findById(id, {
      testBegins: 1,
      testConducted: 1,
    })
      .then((test) => {
        if (test) {
          if (test.testBegins !== true && test.testConducted !== true) {
            TestModel.findOneAndUpdate(
              { _id: id },
              { isRegistrationAvailable: status }
            ).exec(function (err) {
              if (err) {
                res.status(500).json({
                  success: false,
                  message: "Unable to change registration status",
                });
              } else {
                res.json({
                  success: true,
                  message: "Registration status changed!",
                  currentStatus: status,
                });
              }
            });
          } else {
            res.json({
              success: false,
              message: "Unable to change registration status",
            });
          }
        } else {
          res.status(500).json({
            success: false,
            message: "Unable to change registration status",
          });
        }
      })
      .catch((_) => {
        res.status(500).json({
          success: false,
          message: "Unable to change registration status",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const begin = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { id: _id } = req.body;

    TestModel.findOneAndUpdate(
      { _id, testConducted: false },
      { testBegins: 1, isRegistrationAvailable: 0 },
      { new: true }
    )
      .then((data) => {
        if (data) {
          const {
            isRegistrationAvailable,
            testBegins,
            testConducted,
            isResultGenerated,
          } = data;

          res.json({
            success: true,
            message: "Test has been started.",
            data: {
              isRegistrationAvailable,
              testBegins,
              testConducted,
              isResultGenerated,
            },
          });
        } else {
          res.json({
            success: false,
            message: "Unable to start test.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const beginWithAnswerSheet = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { id: _id } = req.body;

    TestModel.findOneAndUpdate(
      { _id, testConducted: false },
      { testBegins: 1, isRegistrationAvailable: 0 },
      { new: true }
    )
      .then((data) => {
        if (data) {
          const startTime = new Date();
          const { questions } = data;

          const _newAnswerSheet = {
            questions,
            answers: [],
            completed: false,
            startTime,
            testId: _id,
          };

          TraineeEnterModel.find({ testId: _id }, { testId: 0 })
            .then(async (candidates) => {
              await Promise.all(
                candidates.map(async (candidate) => {
                  const { _id } = candidate;

                  const newAnswerSheet = AnswerSheetModel({
                    ..._newAnswerSheet,
                    userId: _id,
                  });

                  newAnswerSheet
                    .save()
                    .then((answerSheet) => {
                      const {
                        isRegistrationAvailable,
                        testBegins,
                        testConducted,
                        isResultGenerated,
                      } = data;

                      res.json({
                        success: true,
                        message: "Test has been started.",
                        data: {
                          isRegistrationAvailable,
                          testBegins,
                          testConducted,
                          isResultGenerated,
                        },
                      });
                    })
                    .catch(() => {
                      res.status(500).json({
                        success: false,
                        message: "Something went wrong",
                      });
                    });
                })
              );
              res.json({
                success: true,
                message: "success",
                data: candidates,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                success: false,
                message: "Unable to get candidates!",
              });
            });
        } else {
          res.json({
            success: false,
            message: "Unable to start test.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const end = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { id: _id } = req.body;

    TestModel.findOneAndUpdate(
      { _id, testConducted: 0 },
      { testConducted: 1 },
      { new: true }
    )
      .then((info) => {
        if (info) {
          const {
            isRegistrationAvailable,
            testBegins,
            testConducted,
            isResultGenerated,
          } = info;

          res.json({
            success: true,
            message: "The test has ended.",
            data: {
              isRegistrationAvailable,
              testBegins,
              testConducted,
              isResultGenerated,
            },
          });
        } else {
          res.json({
            success: false,
            message: "Invalid inputs!",
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const getCandidateDetails = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const testId = req.body.testId;

    ResultModel.find({ testId: testId }, { score: 1, userId: 1 })
      .populate("userId")
      .exec(function (err, getCandidateDetails) {
        if (err) {
          res.status(500).json({
            success: false,
            message: "Unable to fetch details",
          });
        } else {
          if (getCandidateDetails.length == null) {
            res.json({
              success: false,
              message: "Invalid testId!",
            });
          } else {
            res.json({
              success: true,
              message: "Candidate details",
              data: getCandidateDetails,
            });
          }
        }
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const getCandidates = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const testId = req.body.id;

    TraineeEnterModel.find({ testId: testId }, { testId: 0 })
      .then((candidates) => {
        res.json({
          success: true,
          message: "success",
          data: candidates,
        });
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to get candidates!",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

module.exports = {
  create,
  createWithAutoGeneratedQuestions,

  get,
  getAll,
  getTrainerTest,

  remove,

  getCandidateDetails,
  getCandidates,

  updateRegistrationStatus,
  begin,
  beginWithAnswerSheet,
  end,
};