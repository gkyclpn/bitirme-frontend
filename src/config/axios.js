import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization : `Bearer 15b096476a58c5a545fd7efa5a0ad538f834058b94fef3279e02aed240124cc26c9b9413eda11c59c7fb4cc19cf92508f054fb4795ea547d4a91530c6daf88b7e6bda9f3f709b825a272facf0b95a1edceb572dae206000a3b325234e26da3024ffb8eeb65dfb818ec13a680fa4cdb711c4398ec5a1c62ce17204016535da0ab6e51a5492bebe73655ff418e1fadd36ed38564bc367b8f92c53360334724f33c58dbd1ae238fa0f1270b445b9edff8ae8270b724b95a5a846912b6d4c60c101007d4b0c8d3d1be46cd2988f6d177dca3a8335d3cb8abf6028d150756aaafa1df6ac986d2616c79c6229e1c240e290ba0a91104`
    }
});


instance.interceptors.response.use(null, data => {
  console.log(data.response.status)
  if (data.response.status === 401) {
    window.location.href = '/'
  }
  return data
})

export default instance;