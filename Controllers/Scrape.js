const { Key, Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const Trends = require("../models/trends");

exports.login = async (req, res) => {
  // Set up the browser (Chrome in this case)
  let options = new chrome.Options();
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the login page
    await driver.get("https://x.com/login");

    // Wait until the username field is present
    await driver.wait(
      until.elementLocated(By.css('input[autocomplete="username"]')),
      10000
    );

    // Find the username field using the exact CSS selector and input the username
    await driver
      .findElement(By.css('input[autocomplete="username"]'))
      .sendKeys("tanmayysane", Key.RETURN);

    // await driver.findElement(By.css('.css-175oi2r')).click();

    await driver.wait(
      until.elementLocated(By.css('input[autocomplete="current-password"]')),
      10000
    );

    // Find the password field using the exact CSS selector and input the password
    await driver
      .findElement(By.css('input[autocomplete="current-password"]'))
      .sendKeys("tweetasm.tam@304", Key.RETURN);

    // Wait for a while to see the result after login
    await driver.wait(until.urlContains("home"), 10000);
    console.log("Login successful!");

    await driver.wait(
      until.elementLocated(By.css("[aria-label='Timeline: Trending now']")),
      10000 // Timeout after 10 seconds
    );

    const trendingTopicsSection = await driver.findElement(
      By.css("[aria-label='Timeline: Trending now']")
    );

    await driver.wait(
      until.elementLocated(By.css("[data-testid='trend']")),
      10000 // Timeout after 10 seconds
    );

    const trendingTopics = await trendingTopicsSection.findElements(
      By.css("[data-testid='trend']")
    );

    // const trends = [];
    // for(let n of trendingTopics){
    //     trends.push(await n.getText());
    // }

    // console.log(trends);
    const trendingNames = [];

    for (let i = 0; i < 5 && i < trendingTopics.length; i++) {
      // Use index (i) for loop
      try {
        const trendText = await trendingTopics[i].getText();
        trendingNames.push({ name: trendText });
      } catch (error) {
        console.error(
          `Error getting text for trending topic at index ${i}:`,
          error
        );
      }
    }

    console.log("Trending Names:");
    console.log(trendingNames);
    res.json(trendingNames);

    const trend = new Trends ({
        trends: trendingNames,
        idAddress: "123.123.123.123",
    })

    await trend.save();
    // for (let i = 0; i < 5; i++) {
    //     if (trendingTopics.length >0) {
    //         // Attempt to get text only if the list is not empty and the index is valid
    //         const trendText = trendingTopics[i].getText();
    //         console.log(trendText);
    //       } else {
    //         console.error("Error: Unable to get text from trending topic. List is empty or index is out of bounds.");
    //       }
    // //   trends.push({ name: `nameoftrend${i + 1}`, value: trendText });
    // }

    // await driver.wait(until.elementLocated(By.css(".css-1jxf684")), 10000);
    // var trends = driver.findElement(By.css(".css-1jxf684"));

    // for (let n of trends) {
    //   console.log(await n.getText());
    // }
    // console.log(trends);
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    // Quit the browser
    await driver.quit();
  }
}


