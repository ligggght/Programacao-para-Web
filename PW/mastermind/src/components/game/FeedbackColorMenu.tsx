// // IGNORAR POR ENQUANTO

// import {
//   Popover,
//   PopoverHandler,
//   PopoverContent,
//   Button,
// } from "@material-tailwind/react";

// //   {/* Menu dropdown */}
// //   {showMenu && (
// //     <div
// //       ref={menuRef}
// //       className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex gap-2 p-2 bg-gray-900 border-2 border-cyan-500 rounded-lg z-10"
// //     >
// //       {Object.entries(FEEDBACK_TYPES).map(([type, className]) => (
// //         <button
// //           key={type}
// //           className={`w-5 h-5 rounded-full ${className}`}
// //           onClick={() => {
// //             onChange(type);
// //             setShowMenu(false);
// //           }}
// //           title={type || "empty"}
// //         />
// //       ))}
// //     </div>
// //   )}

// export function FeedbackColorMenu({
//   open,
//   setOpen,
//   children,
// }: {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <Popover
//       animate={{
//         mount: { scale: 1, y: 0 },
//         unmount: { scale: 0, y: 25 },
//       }}
//     >
//       <PopoverHandler>
//         <Button onClick={() => setOpen(!open)}>Select Feedback</Button>
//       </PopoverHandler>
//       <PopoverContent>
//         <>{children}</>
//       </PopoverContent>
//     </Popover>
//   );
// }
