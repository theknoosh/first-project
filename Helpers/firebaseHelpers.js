export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapShot => {
    let item = childSnapShot.val();
    item.key = childSnapShot.key;

    returnArr.push(item);
  });

  return returnArr;
};
