/*
file: src.plugins.font-awesome.js
description: 
  configura a biblioteca Font Awesome no contexto do projeto,
  importando ícones específicos, adiciona à biblioteca e 
  exporta o componente FontAwesomeIcon para ser reutilizado.
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
*/

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faHome,
	faUsers,
	faUser,
	faUserPlus,
	faUserMinus,
	faUserPen,
	faUserCheck,
	faUserXmark,
	faUserLock,
	faUserClock,
	faUserSlash,
	faSignInAlt,
	faSignOutAlt,
	faFolderOpen,
	faFolderClosed,
	faHouse,
	faCameraRetro,
	faComment,
	faEnvelope,
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faHome,
	faUsers,
	faUser,
	faUserPlus,
	faUserMinus,
	faUserPen,
	faUserCheck,
	faUserXmark,
	faUserLock,
	faUserClock,
	faUserSlash,
	faSignInAlt,
	faSignOutAlt,
	faFolderOpen,
	faFolderClosed,
	faHouse,
	faCameraRetro,
	faEnvelope,
	faComment,
)

export { FontAwesomeIcon }
