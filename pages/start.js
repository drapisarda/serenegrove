// //** LEGACY */
// <template>
//   <section id="routine" class="section section--clear">
//     <div class="container">
//       <h2>
//         Create your routine. Enjoy meditation.
//       </h2>
//       <p>
//         Start by just clicking on the "Add steps to your routine" button.
//       </p>
//       <p></p>
//       <Player />
//       <div class="container is-max-desktop">
//         <ClientOnly>
//           <template #fallback>
//             <Loader />
//           </template>
//           <ListItems />
//           <Modal>
//             <template v-slot:button-text>
//               <Plus />
//               Add steps to your routine
//             </template>
//             <template v-slot:modal-title>
//               <h3> Add steps to your routine </h3>
//             </template>
//             <template v-slot:modal-content>
//               <ListStepItems />
//             </template>
//           </Modal>
//         </ClientOnly>
//       </div>
//     </div>
//   </section>
// </template>

// <style lang="scss" >
// @import "@/style/vars.scss";

// .player {
//   margin-bottom: $size-4;
// }

// .modal {
//   text-align: center;
// }

// ul {
//   list-style: none;
// }
// </style>