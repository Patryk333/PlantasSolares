import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Supaservice } from '../services/supaservice';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const supaService: Supaservice = inject(Supaservice);
  const urlTree: UrlTree = router.parseUrl('/home');
  return supaService.loggedSubject.getValue()?true : urlTree;
};
