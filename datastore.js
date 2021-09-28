// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
const config = require('./config');
const {Datastore} = require('@google-cloud/datastore');

const ds = new Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});

const kind = 'Tasks';

// Returns a promise
// [START list]
function list() {
  const q = ds.createQuery([kind]);
  const p = ds.runQuery(q);
  return p.then(([results, { moreResults, endCursor }]) => {
    const tasks = results.map(item => {
      item.id = item[Datastore.KEY].id;
      return item;
    });
    return {
      tasks,
      nextPageToken:
          moreResults != 'NO_MORE_RESULTS' ? endCursor : false
    };
  });
}
// [END list]

// [START create]
function create(title) {
  const key = ds.key(kind);
  const entity = {
    key,
    data: [
      { name: 'title', value: title }
    ]
  };
  return ds.save(entity);
}
// [END create]

function remove(taskId) {
  taskId = Number(taskId);
  const taskKey = ds.key(['Tasks', taskId]);
  return ds.delete(taskKey);
}

// [START exports]
module.exports = {
  create,
  list,
  remove
};
// [END exports]