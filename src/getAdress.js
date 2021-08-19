/**
 * 緯度・経度から住所を取得
 *
 * @param {number} lat 緯度
 * @param {number} lng 経度
 * @returns 住所（市まで）
 */
export async function getAdressFromGeo(lat, lng) {
  const url = `http://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${lng}&y=${lat}`;

  const res = await fetch(url);
  const json = await res.json();

  // エラー！
  if (!res.ok || json?.response.error) {
    return "";
  }

  const location = json.response.location[0];
  const address = location.prefecture + location.city;

  return address;
}
