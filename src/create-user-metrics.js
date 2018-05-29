import { helpers } from 'mostly-feathers-mongoose';
import fp from 'mostly-func';

/**
 * Create user metrics defined in rewards with variables
 */
export default async function createUserMetrics (app, user, rewards, variables){
  const svcUserMetrics = app.service('user-metrics');
  const create = fp.reduce((arr, reward) => {
    if (reward.metric) {
      reward.metric = helpers.getId(reward.metric);
      reward.user = user;
      reward.variables = variables;
      return arr.concat(svcUserMetrics.create(reward));
    }
    return arr;
  }, []);
  const metrics = await Promise.all(create(rewards));
  return fp.flatten(metrics);
}