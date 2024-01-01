const cron = require("node-cron");
const Post = require("../model/post");

cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    await Post.updateMany(
      {
        createdAt: { $lt: thirtyDaysAgo },
        status: { $ne: "expired" },
      },
      { status: "expired" }
    );

    console.log("Cron job executed successfully!");
  } catch (error) {
    console.error("Cron job execution failed:", error);
  }
});
