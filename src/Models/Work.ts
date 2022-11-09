export type WorkNameType =
  "tratamiento capilar"
| "retoque de raiz"
| "mechas/balagaye/babyligths"
| "retoque de mechas"
| "corte de pelo" ;

interface Work {
  name: WorkNameType
  img: string
}

const Works: Work[] = [
  {name: "tratamiento capilar", img: "/icons/0.png",},
  {name: "retoque de raiz", img: "/icons/1.png",},
  {name: "mechas/balagaye/babyligths", img: "/icons/2.png",},
  {name: "retoque de mechas", img: "/icons/3.png",},
  {name: "corte de pelo", img: "/icons/4.png",},
];

export { Works }
export default Work