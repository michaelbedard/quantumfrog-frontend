import axios from 'axios';


export async function getStateVector(lien = 'articles') {
  const res = await axios.get(`${lien}`);
  return res.data;
}

export async function updateWorld(data : any) {
    const angle : number = 45;
    return angle;
  await axios.put('/articles', {
    title: data.title,
  });
  return true;
}










