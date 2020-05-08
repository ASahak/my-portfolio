import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
} from '@angular/animations';

export const thinking = trigger(
    'inOutAnimation',
    [
        transition(
            ':enter',
            [
                style({ opacity: 0, transform: 'translateX(-100%)' }),
                animate('.6s ease-out',
                    style({ opacity: 1, transform: 'translateX(0px)' })),
            ]
        ),
        transition(
            ':leave',
            [
                style({ opacity: 1, transform: 'translateX(0%)' }),
                animate('.6s ease-in',
                    style({  opacity: 0, transform: 'translateX(100%)' }))
            ]
        )
    ]
);

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('HomePage <=> 404', [
            style({position: 'relative'}),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({left: '-100%'})
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({left: '100%'}))
                ]),
                query(':enter', [
                    animate('300ms ease-out', style({left: '0%'}))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
    ]);
export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(
            ':enter',
            [style({ opacity: 0, transform: 'scale(0.8)' })],
            { optional: true }
        ),
        query(
            ':leave',
            [style({ opacity: 1, transform: 'scale(1)' }), animate('0.3s', style({ opacity: 0, transform: 'scale(0.8)' }))],
            { optional: true }
        ),
        query(
            ':enter',
            [style({ opacity: 0, transform: 'scale(0.8)', transitionDelay: '2s'  }), animate('0.3s', style({ opacity: 1, transform: 'scale(1)'}))],
            { optional: true, delay: 2800 }
        )
    ])
]);
