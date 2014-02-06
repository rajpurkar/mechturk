function amt_process_cars(amt_results);

  base_img_dir = '/local/IMAGES/driving_data_twangcat/all_extracted';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/7-16-sacramento-v2/7-16-sacramento-v2.results';
  amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/7-16-sacramento/7-16-sacramento.results';
    
  % extract annotations from amt results table
  annolist_all_workers = amt_to_al(base_img_dir, amt_results);

  % optionally, save results for by worker, 

%   [~, amt_name, ~] = splitpathext(amt_results);
%   worker_annolist = split_by_workerid(annolist_all_workers, [basedir '/split_by_worker/' amt_name]);
% 
%   % evaluate annoations 
%   amt_al_accept_reject(basedir, amt_results);
% 
%   % create accept/reject/empty files 
%   amt_al_accept_reject_gen(basedir, amt_results);
%   
%   % print worker statistics
%   [amt_path, amt_name, amt_ext] = splitpathext(amt_results);
%   input_mat = [basedir '/' amt_name '_eval.mat'];
%   load(input_mat, 'annolist');
%   amt_print_stats(annolist);
% 
%   fprintf('please take a look at annolist_noeval.al and mark rejected annorects with <rc> ... </rc>, then run: \n');
%   fprintf('%s\n', ['amt_process_noeval(''' amt_results ''');']);
% 
