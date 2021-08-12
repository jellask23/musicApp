import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state
} from '@angular/animations';

// export const transAnimation = animation([
//     style({
//         height: '{{ height }}',
//         opacity: '{{ opacity }}',
//         backgroundColor: '{{ backgroundColor }}'
//     }),
//     animate('{{ time }}')
// ]);

// Routable animations

export const slideInAnimation =
    trigger('leaveAnimation', [
        transition(':leave', [
            animate(300,
            style({
                height: '0',
            }))            
        ]),
        transition(':enter', [
            animate(300, style({
                height: '0',
            })
            )
        ]),
        // transition(
        //     ':enter',
        //     [
        //         style({ opacity: 0 }),
        //         animate('300ms',
        //             style({ opacity: 1 }))
        //     ]
        // ),
        // transition(
        //     ':leave',
        //     [
        //         style({ opacity: 1 }),
        //         animate('0ms',
        //             style({ opacity: 0 }))
        //     ]
        // )
    ]);