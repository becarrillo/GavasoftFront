export default {
    "rolName": "Administrador",
    "adminMenu": [
        {
            "icon": {
                "height": 32,
                "url": "https://img.icons8.com/small/32/conference-foreground-selected.png",
                "width": 32
            },
            "submenu": [
                {
                    "icon": {
                        "height": 24,
                        "url": "https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-employee-business-and-finance-tanah-basah-basic-outline-tanah-basah.png",
                        "width": 24
                    },
                    "redirection": "/menus/menu-administrador/admin-empleados/crear",
                    "title": "Crear empleado"
                },
                {
                    "icon": {
                        "height": 32,
                        "url": "https://img.icons8.com/windows/32/find-user-male--v1.png",
                        "width": 32
                    },
                    "redirection": "/menus/menu-administrador/admin-empleados/consultar",
                    "title": "Consultar empleado"
                },
                {
                    "icon": {
                        "height": 24,
                        "url": "https://img.icons8.com/forma-thin/24/list.png",
                        "width": 24
                    },
                    "redirection": "/menus/menu-administrador/admin-empleados/listar",
                    "title": "Listar empleados"
                }
            ],
            "title": "Administrar perfiles de los empleados"
        },
        {

            "icon": {
                "height": 30,
                "url": "https://img.icons8.com/ios-glyphs/30/lotus.png",
                "width": 30
            },
            "submenu": [
                {
                    "icon": {
                        "height": 24,
                        "url": "https://img.icons8.com/material-outlined/24/service.png",
                        "width": 24
                    },
                    "redirection": "/menus/menu-administrador/admin-servicios/agregar",
                    "title": "Agregar Servicio"
                },
                {
                    "icon": {
                        "height": 24,
                        "url": "https://img.icons8.com/plumpy/24/online-support.png",
                        "width": 24
                    },
                    "title": "Consultar Servicio"
                }
            ],
            "title": "Administrar servicios del SPA"
        },
        {
            "icon": {
                "height": 24,
                "url": "https://img.icons8.com/material-rounded/24/overtime.png",
                "width": 24
            },
            "submenu": [
                {
                    "icon": {
                        "height": 24,
                        "url": "https://img.icons8.com/plumpy/24/online-support.png",
                        "width": 24
                    },
                    "redirection": "/menus/menu-administrador/admin-agenda/agregar",
                    "title": "Agregar agendamiento"
                },
                {
                    "icon": {
                        "height": 24,
                        "url": "https://img.icons8.com/plumpy/24/online-support.png",
                        "width": 24
                    },
                    "redirection": "/menus/menu-administrador/admin-agenda/agendamientos/034s2ec2fcF200T",
                    "title": "Consultar agenda"
                }
                
            ],
            "title": "Administrar agenda del SPA"
        },
        {
            "icon": {
                "height": 24,
                "url": "https://img.icons8.com/material-outlined/24/statistics.png",
                "width": 24
            },
            "submenu": [
                {
                    "icon": {
                        "height": 30,
                        "url": "https://img.icons8.com/ios-glyphs/30/pass-money.png",
                        "width": 30
                    },
                    "redirection": "/menus/menu-administrador/reporte-ingresos/buscar-ingresos-por-cliente",
                    "title": "Ingresos por cliente"
                },
                {
                    "icon": {
                        "height": 24,
                        "url": "https://img.icons8.com/material-two-tone/24/growing-money.png",
                        "width": 24
                    },
                    "redirection": "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.mercadolibre.com.co/&ved=2ahUKEwiXieyC3daFAxXDfjABHYR3DTYQFnoECAgQAQ&usg=AOvVaw3RaGa4k61lM5DvGi-JrIB8",
                    "title": "Informe de ingresos"
                }
            ],
            "title": "Generar reporte de ingresos del SPA"
        },
        {
            "icon": {
                "height": 32,
                "url": "https://img.icons8.com/windows/32/queue.png",
                "width": 32
            },
            "title": "Gestionar clientes"
        }
    ]
}