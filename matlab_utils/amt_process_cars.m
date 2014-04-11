function amt_process_cars(amt_results);

  %base_img_dir = '/local/IMAGES/driving_data_twangcat/all_extracted';
  base_img_dir = '/local/IMAGES/driving_data_sameep/all_extracted';

  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/7-16-sacramento/7-16-sacramento.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/7-18-101/7-18-101.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/7-19-monterey/7-19-monterey.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/7-24-101/7-24-101.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/7-25-bay/7-25-bay.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/8-13-marin/8-13-marin.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/8-14-101/8-14-101.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/8-15-tracy-gilroy/8-15-tracy-gilroy.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/4-2-14-monterey/4-2-14-monterey.results';
  %amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/4-3-14-monterey/4-3-14-monterey.results';

  amt_results = '/afs/cs.stanford.edu/u/andriluka/code/mechturk/hits/4-3-14-gilroy-cam2/4-3-14-gilroy-cam2.results';
    
  % extract annotations from amt results table
  annolist_all_workers = amt_to_al(base_img_dir, amt_results);

  % optionally, save results for by worker, 

  %[hit_dir, amt_name, ~] = splitpathext(amt_results);
  %worker_annolist = split_by_workerid(annolist_all_workers, [hit_dir '/results_by_worker_' amt_name]);
 
  amt_al_accept_all_gen(annolist_all_workers, amt_results);

  % evaluate annoations 
  %amt_al_accept_reject(base_img_dir, amt_results);
 
  % create accept/reject/empty files 
  %amt_al_accept_reject_gen(base_img_dir, amt_results);

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
